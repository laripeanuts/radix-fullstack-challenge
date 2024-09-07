import { AppModule } from '@/app.module';
import { PrismaService } from '@/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import dayjs from 'dayjs';
import request from 'supertest';

describe('Get Measurements by Equipment ID Endpoint (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);

    await app.init();

    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await hash('password123', 8),
      },
    });

    await prisma.equipment.create({
      data: {
        id: 'EQ-12345',
        name: 'Excavator',
        description: 'Heavy duty excavator',
        userId: user.id,
      },
    });

    await prisma.measurement.createMany({
      data: [
        {
          equipmentId: 'EQ-12345',
          value: 100,
          timestamp: dayjs().subtract(1, 'day').toDate(),
        },
        {
          equipmentId: 'EQ-12345',
          value: 200,
          timestamp: dayjs().subtract(2, 'days').toDate(),
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.measurement.deleteMany();
    await prisma.equipment.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });

  it('/measurements/:equipmentId (GET) - should return average measurement for 1d', async () => {
    const response = await request(app.getHttpServer())
      .get('/measurements/EQ-12345')
      .query({ timeFrame: '1d' })
      .expect(200);

    expect(response.body).toEqual({
      equipmentId: 'EQ-12345',
      averageValue: 100,
    });
  });

  it('/measurements/:equipmentId (GET) - should return average measurement for 2d', async () => {
    const response = await request(app.getHttpServer())
      .get('/measurements/EQ-12345')
      .query({ timeFrame: '2d' })
      .expect(200);

    expect(response.body).toEqual({
      equipmentId: 'EQ-12345',
      averageValue: 150,
    });
  });

  it('/measurements/:equipmentId (GET) - should return average measurement for 1w', async () => {
    const response = await request(app.getHttpServer())
      .get('/measurements/EQ-12345')
      .query({ timeFrame: '1w' })
      .expect(200);

    expect(response.body).toEqual({
      equipmentId: 'EQ-12345',
      averageValue: 150,
    });
  });

  it('/measurements/:equipmentId (GET) - should return average measurement for 1m', async () => {
    const response = await request(app.getHttpServer())
      .get('/measurements/EQ-12345')
      .query({ timeFrame: '1m' })
      .expect(200);

    expect(response.body).toEqual({
      equipmentId: 'EQ-12345',
      averageValue: 150,
    });
  });
});
