/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const { id } = await createRootUser();
  const equipmentsIds = await seedEquipments(id);
  await seedMeasurements(equipmentsIds);

  console.log('Finished seeding.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function createRootUser(): Promise<{ id: string }> {
  const existingUser = await prisma.user.findUnique({
    where: { email: 'root@example.com' },
  });

  if (existingUser) {
    return { id: existingUser.id };
  }

  return (await prisma.user.create({
    data: {
      email: 'root@example.com',
      password: 'root',
      name: 'User Root',
    },
  })) as { id: string };
}

async function seedEquipments(userId: string) {
  const filePath = path.join(__dirname, 'data', 'equipments.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');

  if (!rawData) {
    throw new Error('Equipments data not found.');
  }

  const equipmentData = JSON.parse(rawData);
  const equipmentsIds: string[] = [];

  for (const equipment of equipmentData) {
    const existingEquipment = await prisma.equipment.findUnique({
      where: { id: equipment.id },
    });

    if (!existingEquipment) {
      const equip = await prisma.equipment.create({
        data: {
          id: equipment.id,
          name: equipment.name,
          description: equipment.description,
          userId: userId,
        },
      });

      equipmentsIds.push(equip.id);
    }
  }

  console.log('Equipments created successfully.');

  return equipmentsIds;
}

async function seedMeasurements(equipmentIds: string[]) {
  const measurements = generateMeasurements(1000, equipmentIds);

  for (const measurement of measurements) {
    await prisma.measurement.create({
      data: {
        equipmentId: measurement.equipmentId,
        timestamp: new Date(measurement.timestamp),
        value: measurement.value,
      },
    });
  }

  console.log('Measurements created successfully.');
}

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

const getRandomValue = (): number => {
  return parseFloat((Math.random() * 100).toFixed(2));
};

const generateMeasurements = (
  numMeasurements: number,
  equipmentIds: string[],
): { equipmentId: string; timestamp: string; value: number }[] => {
  const measurements: Measurement[] = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3); // 3 meses atrás
  const endDate = new Date(); // Hoje

  for (let i = 0; i < numMeasurements; i++) {
    const measurement: Measurement = {
      equipmentId:
        equipmentIds[Math.floor(Math.random() * equipmentIds.length)] ?? '',
      timestamp: getRandomDate(startDate, endDate).toISOString(),
      value: getRandomValue(),
    };
    measurements.push(measurement);
  }

  return measurements;
};

type Measurement = {
  equipmentId: string;
  timestamp: string;
  value: number;
};
