/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const user = await createRootUser();
  await seedEquipments(user.id);

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
  return (await prisma.user.create({
    data: {
      email: 'root@example.com',
      password: 'root',
      name: 'User Root',
    },
  })) as { id: string };
}

async function seedEquipments(userId: string) {
  const filePath = path.join(__dirname, 'seed', 'equipments.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const equipmentData = JSON.parse(rawData);

  for (const equipment of equipmentData) {
    await prisma.equipment.create({
      data: {
        id: equipment.id,
        name: equipment.name,
        description: equipment.description,
        userId: userId,
      },
    });
  }

  console.log('Equipments created successfully.');
}
