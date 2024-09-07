import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/database/prisma/prisma.service';

describe('Session Endpoint (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/sessions (POST) - should create a new session', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await hash('password123', 8),
      },
    });

    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'john.doe@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });

  it('/sessions (POST) - should return unauthorized if credentials are invalid', async () => {
    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'invalid@example.com',
        password: 'invalidpassword',
      })
      .expect(401);

    expect(response.body.message).toBe('Invalid email or password');
  });
});
