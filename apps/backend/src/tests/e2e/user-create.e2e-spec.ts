import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/database/database.module';
import { UserFactory } from '@/tests/factories/prisma/users-factories';

describe('User Endpoint (e2e)', () => {
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

  it('/users (POST) - should create a new user', async () => {
    const user = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .expect(201);

    expect(response.body).toEqual({
      user: {
        id: expect.any(String),
        name: user.name,
        email: user.email,
        createdAt: expect.any(String),
      },
    });
  });

  it('/users (POST) - should return conflict if user already exists', async () => {
    const user = await userFactory.makePrismaUser();

    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .expect(409);

    expect(response.body.message).toBe(`User "${user.email}" already created`);
  });
});
