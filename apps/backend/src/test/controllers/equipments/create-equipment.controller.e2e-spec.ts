import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';

describe('Equipments Endpoint (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
    jwtService = moduleFixture.get(JwtService);

    await app.init();

    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await hash('password123', 8),
      },
    });

    accessToken = jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
    });
  });

  it('/equipments (POST) - should create a new equipment', async () => {
    const response = await request(app.getHttpServer())
      .post('/equipments')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Excavator',
        description: 'Heavy duty excavator',
      })
      .expect(201);

    // expect object contains id, name, and description
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'Excavator',
      description: 'Heavy duty excavator',
      userId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const equipmentOnDatabase = await prisma.equipment.findFirst({
      where: {
        name: 'Excavator',
      },
    });

    expect(equipmentOnDatabase).toBeTruthy();
  });

  it('/equipments (POST) - should return unauthorized if no token is provided', async () => {
    const response = await request(app.getHttpServer())
      .post('/equipments')
      .send({
        name: 'Bulldozer',
        description: 'Heavy duty bulldozer',
      })
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });
});
