export type EquipmentStatus = 'OPERATIONAL' | 'MAINTENANCE' | 'OUT_OF_SERVICE';

export type Equipment = {
  name: string;
  description: string;
  id: string;
  status: EquipmentStatus;
  createdAt?: string;
  userId: string;
};
