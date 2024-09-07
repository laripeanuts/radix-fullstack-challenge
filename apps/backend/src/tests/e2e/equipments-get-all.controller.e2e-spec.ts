import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/database/database.module';
import { EquipmentsFactory } from '@/tests/factories/prisma/equipments-factories';
import { UserFactory } from '../factories/prisma/users-factories';

describe('EquipmentsGetAllController (e2e)', () => {
  let app: INestApplication;
  let equipmentsFactory: EquipmentsFactory;
  let userFactory: UserFactory;
  let jwt: JwtService;

  let token;
  let userId;
  let equipments;

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
    // Set the userId
    userId = user.id.toString();
    // Get the token
    token = jwt.sign({
      sub: userId,
      email: user.email,
      name: user.name,
    });

    // Create an equipments
    equipments = await Promise.all([
      equipmentsFactory.makePrismaEquipment({
        userId: userId,
      }),
      equipmentsFactory.makePrismaEquipment({
        userId: userId,
      }),
      equipmentsFactory.makePrismaEquipment({
        userId: userId,
      }),
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/equipments (GET) should get all equipments', async () => {
    const response = await request(app.getHttpServer())
      .get('/equipments')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.equipments).toHaveLength(3);
    expect(response.body.equipments).toEqual(
      expect.arrayContaining(
        equipments.map((equipment) => ({
          id: equipment.id,
          name: equipment.name,
          description: equipment.description,
          userId: userId,
        })),
      ),
    );
  });

  it('/equipments (GET) should not get all equipments if unauthorized', async () => {
    const response = await request(app.getHttpServer())
      .get('/equipments')
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });
});
