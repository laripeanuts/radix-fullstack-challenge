import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UserFactory } from '../factories/prisma/users-factories';

describe('Equipments Endpoint (e2e)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let jwt: JwtService;

  let token;
  let userId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleFixture.createNestApplication();
    userFactory = moduleFixture.get(UserFactory);
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
  });

  it('/equipments (POST) - should create a new equipment', async () => {
    const response = await request(app.getHttpServer())
      .post('/equipments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Equipment Test',
        description: 'Equipment Description',
      })
      .expect(201);

    expect(response.body).toEqual({
      equipment: {
        id: expect.any(String),
        name: 'Equipment Test',
        description: 'Equipment Description',
        userId: userId.toString(),
      },
    });
  });

  it('/equipments (POST) - should not create a new equipment without a name', async () => {
    await request(app.getHttpServer())
      .post('/equipments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Equipment Description',
      })
      .expect(400);
  });

  it('/equipments (POST) - should not create a new equipment if not authorized', async () => {
    const response = await request(app.getHttpServer())
      .post('/equipments')
      .send({
        name: 'Equipment Test',
      })
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });
});
