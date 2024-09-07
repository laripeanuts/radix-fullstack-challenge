import { AppModule } from '@/app.module';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { DatabaseModule } from '@/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { EquipmentsFactory } from '../factories/prisma/equipments-factories';
import { UserFactory } from '../factories/prisma/users-factories';

describe('Measurements Endpoint (e2e)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let equipmentsFactory: EquipmentsFactory;
  let jwt: JwtService;

  let token;
  let equipmentId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, EquipmentsFactory],
    }).compile();

    app = moduleFixture.createNestApplication();
    userFactory = moduleFixture.get(UserFactory);
    equipmentsFactory = moduleFixture.get(EquipmentsFactory);
    jwt = moduleFixture.get(JwtService);

    await app.init();

    // Login
    const user = await userFactory.makePrismaUser();
    // Get the token
    token = jwt.sign({
      sub: user.toString(),
      email: user.email,
      name: user.name,
    });
    // Create an equipment
    const equipment = await equipmentsFactory.makePrismaEquipment({
      userId: new UniqueEntityID(user.id.toString()),
    });
    // Set the equipmentId
    equipmentId = equipment.id;
  });

  it('/measurements/:equipmentId (POST) - should create a new measurement', async () => {
    const response = await request(app.getHttpServer())
      .post(`/measurements/${equipmentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 100,
        timestamp: '2023-10-01T00:00:00Z',
      })
      .expect(201);

    expect(response.body).toEqual({
      measurement: {
        id: expect.any(String),
        equipmentId,
        value: 100,
        timestamp: '2023-10-01T00:00:00.000Z',
      },
    });
  });

  it('/measurements/:equipmentId (POST) - should create a new measurement with default timestamp', async () => {
    const response = await request(app.getHttpServer())
      .post(`/measurements/${equipmentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 200,
      })
      .expect(201);

    expect(response.body).toEqual({
      measurement: {
        id: expect.any(String),
        equipmentId,
        value: 200,
        timestamp: expect.any(String),
      },
    });
  });

  it('/measurements/:equipmentId (POST) - should not create if has a invalid equipmentId', async () => {
    const response = await request(app.getHttpServer())
      .post(`/measurements/invalid`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 200,
      })
      .expect(404);

    expect(response.body.message).toBe(`Equipment with id invalid not found`);
  });

  it('/measurements/:equipmentId (POST) - should not create a new measurement if not authorized', async () => {
    const response = await request(app.getHttpServer())
      .post(`/measurements/${equipmentId}`)
      .send({
        value: 200,
      })
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });
});
