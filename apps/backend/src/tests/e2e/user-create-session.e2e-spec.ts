import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/database/database.module';
import { UserFactory } from '../factories/prisma/users-factories';

describe('Session Endpoint (e2e)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleFixture.createNestApplication();
    userFactory = moduleFixture.get(UserFactory);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users/session (POST) - should create a new session', async () => {
    await userFactory.makePrismaUser({
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    });

    const response = await request(app.getHttpServer())
      .post('/users/session')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      })
      .expect(201);

    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  it('/users/session (POST) - should return unauthorized if credentials are invalid', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/session')
      .send({
        email: 'invalid@example.com',
        password: 'invalidpassword',
      })
      .expect(401);

    expect(response.body.message).toBe('User invalid credentials');
  });
});
