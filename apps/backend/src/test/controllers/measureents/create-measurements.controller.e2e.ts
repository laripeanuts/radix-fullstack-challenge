import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import * as request from 'supertest';

describe('Measurements Endpoint (e2e)', () => {
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
  });

  it('/measurements (POST) - should create a new measurement', async () => {
    const response = await request(app.getHttpServer())
      .post('/measurements')
      .send({
        equipmentId: 'EQ-12345',
        value: 100,
        timestamp: '2023-10-01T00:00:00Z',
      })
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      equipmentId: 'EQ-12345',
      value: 100,
      timestamp: '2023-10-01T00:00:00.000Z',
    });

    const measurementOnDatabase = await prisma.measurement.findFirst({
      where: {
        equipmentId: 'EQ-12345',
      },
    });

    expect(measurementOnDatabase).toBeTruthy();
  });

  it('/measurements (POST) - should create a new measurement with default timestamp', async () => {
    const response = await request(app.getHttpServer())
      .post('/measurements')
      .send({
        equipmentId: 'EQ-12345',
        value: 200,
      })
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      equipmentId: 'EQ-12345',
      value: 200,
      timestamp: expect.any(String),
    });

    const measurementOnDatabase = await prisma.measurement.findFirst({
      where: {
        equipmentId: 'EQ-12345',
        value: 200,
      },
    });

    expect(measurementOnDatabase).toBeTruthy();
  });
});
