import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import * as request from 'supertest';

describe('Get Equipments Endpoint (e2e)', () => {
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

    await prisma.equipment.createMany({
      data: [
        {
          name: 'Excavator',
          description: 'Heavy duty excavator',
          userId: user.id,
        },
        {
          name: 'Bulldozer',
          description: 'Heavy duty bulldozer',
          userId: user.id,
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.equipment.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });

  it('/equipments (GET) - should return all equipments', async () => {
    const response = await request(app.getHttpServer())
      .get('/equipments')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.equipments).toHaveLength(2);
    expect(response.body.equipments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Excavator',
          description: 'Heavy duty excavator',
        }),
        expect.objectContaining({
          name: 'Bulldozer',
          description: 'Heavy duty bulldozer',
        }),
      ]),
    );
  });

  it('/equipments (GET) - should return unauthorized if no token is provided', async () => {
    const response = await request(app.getHttpServer())
      .get('/equipments')
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });
});
