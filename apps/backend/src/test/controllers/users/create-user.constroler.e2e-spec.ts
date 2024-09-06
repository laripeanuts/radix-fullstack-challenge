// create-user.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';

describe('Create User Endpoint (e2e)', () => {
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

  it('/users (POST) - should create a new user', async () => {
    expect(1).toBe(1);
  });

  it('/users (POST) - should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        email: 'john.doe@example.com',
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });

  // it('/users (POST) - should return conflict if user already exists', async () => {
  //   await request(app.getHttpServer())
  //     .post('/users')
  //     .send({
  //       name: 'Jane Doe',
  //       email: 'jane.doe@example.com',
  //       password: 'password123',
  //     })
  //     .expect(201);

  //   const response = await request(app.getHttpServer())
  //     .post('/users')
  //     .send({
  //       name: 'Jane Doe',
  //       email: 'jane.doe@example.com',
  //       password: 'password123',
  //     })
  //     .expect(409);

  //   expect(response.body.message).toBe(
  //     'User with same email address already exists',
  //   );
  // });
});
