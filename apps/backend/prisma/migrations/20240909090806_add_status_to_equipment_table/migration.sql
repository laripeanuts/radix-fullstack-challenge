-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('OPERATIONAL', 'MAINTENANCE', 'OUT_OF_SERVICE');

-- AlterTable
ALTER TABLE "equipments" ADD COLUMN     "status" "EquipmentStatus" NOT NULL DEFAULT 'OPERATIONAL';
