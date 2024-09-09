import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/database/database.module';
import { PrismaService } from '@/database/prisma/prisma.service';
import { EquipmentsFactory } from '@/tests/factories/prisma/equipments-factories';
import { MeasurementsFactory } from '@/tests/factories/prisma/measurements-factories';
import { UserFactory } from '@/tests/factories/prisma/users-factories';

describe('MeasurementsAverageByEquipmentsController (e2e)', () => {
  let app: INestApplication;

  let equipmentsFactory: EquipmentsFactory;
  let measurementsFactory: MeasurementsFactory;
  let userFactory: UserFactory;
  let jwt: JwtService;

  let token;
  let userId;
  let equipmentId;
  let measurements;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, MeasurementsFactory, EquipmentsFactory],
    }).compile();

    app = moduleFixture.createNestApplication();
    userFactory = moduleFixture.get(UserFactory);
    equipmentsFactory = moduleFixture.get(EquipmentsFactory);
    measurementsFactory = moduleFixture.get(MeasurementsFactory);
    jwt = moduleFixture.get(JwtService);

    await app.init();

    // Login
    const user = await userFactory.makePrismaUser();
    // Set the userId
    userId = user.id.toString();
    // Get the token
    token = jwt.sign({
      sub: userId,
      email: user.email,
      name: user.name,
    });

    equipmentId = await equipmentsFactory
      .makePrismaEquipment({
        userId: userId,
      })
      .then((equipment) => equipment.id);

    measurements = await Promise.all([
      measurementsFactory.makePrismaMeasurement({
        equipmentId,
        timestamp: new Date(),
        value: 10,
      }),
      measurementsFactory.makePrismaMeasurement({
        equipmentId,
        value: 20,
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
      }),
      measurementsFactory.makePrismaMeasurement({
        equipmentId,
        timestamp: new Date(new Date().setDate(new Date().getDate() - 5)),
        value: 30,
      }),
      measurementsFactory.makePrismaMeasurement({
        equipmentId,
        timestamp: new Date(new Date().setDate(new Date().getDate() - 10)),
        value: 40,
      }),
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/measurements/:equipmentId/average (GET) should get average measurements by equipment id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/measurements/${equipmentId}/average`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.averageByInterval).toBeDefined();
    expect(response.body.averageByInterval['1d']).toBe(10);
    expect(response.body.averageByInterval['2d']).toBe(15);
    expect(response.body.averageByInterval['1w']).toBe(20);
    expect(response.body.averageByInterval['1m']).toBe(25);
  });

  it('/measurements/:equipmentId/average (GET) should not get average unauthorized', async () => {
    const response = await request(app.getHttpServer())
      .get(`/measurements/${equipmentId}/average`)
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });
});
