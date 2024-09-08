import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { DatabaseModule } from '@/database/database.module';
import { PrismaService } from '@/database/prisma/prisma.service';
import { EquipmentsFactory } from '@/tests/factories/prisma/equipments-factories';
import { MeasurementsFactory } from '@/tests/factories/prisma/measurements-factories';
import { UserFactory } from '@/tests/factories/prisma/users-factories';

describe('MeasurementCreateManyUploadCsvController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let userFactory: UserFactory;
  let equipmentsFactory: EquipmentsFactory;
  let measurementsFactory: MeasurementsFactory;

  let token: string;
  let userId: string;
  let equipmentId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, EquipmentsFactory, MeasurementsFactory],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
    jwtService = moduleFixture.get(JwtService);
    userFactory = moduleFixture.get(UserFactory);
    equipmentsFactory = moduleFixture.get(EquipmentsFactory);
    measurementsFactory = moduleFixture.get(MeasurementsFactory);

    await app.init();

    const user = await userFactory.makePrismaUser();
    userId = user.id.toString();
    token = jwtService.sign({
      sub: userId,
      email: user.email,
      name: user.name,
    });

    const equipment = await equipmentsFactory.makePrismaEquipment({
      userId: user.id as UniqueEntityID,
    });

    equipmentId = equipment.id;
  });

  afterAll(async () => {
    await prisma.measurement.deleteMany();
    await prisma.equipment.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });

  it('/measurements/upload-csv (POST) - should create measurements from CSV', async () => {
    const csvData = `
      timestamp,value
      2023-10-01T00:00:00Z,100
      2023-10-02T00:00:00Z,200
    `;

    const response = await request(app.getHttpServer())
      .post('/measurements/upload-csv')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from(csvData), 'measurements.csv')
      .expect(201);

    expect(response.body.message).toBe('Measurements created successfully');

    const measurements = await prisma.measurement.findMany({
      where: { equipmentId },
    });

    expect(measurements).toHaveLength(2);
    expect(measurements).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: 100 }),
        expect.objectContaining({ value: 200 }),
      ]),
    );
  });

  it('/measurements/upload-csv (POST) - should return 400 if CSV is invalid', async () => {
    const invalidCsvData = `
      timestamp,value
      invalid-timestamp,100
    `;

    const response = await request(app.getHttpServer())
      .post('/measurements/upload-csv')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from(invalidCsvData), 'measurements.csv')
      .expect(400);

    expect(response.body.message).toBeDefined();
  });
});
