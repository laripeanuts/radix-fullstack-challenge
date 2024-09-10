import { EquipmentStatus } from '@/@types/entities/equipment';
import { api } from '../../infra/api';

export interface EquipmentsCreateBodyRequest {
  name: string;
  description: string;
  status: EquipmentStatus;
}

export const equipmentsCreate = async (body: EquipmentsCreateBodyRequest) => {
  const response = await api.post(`/equipments`, body);

  return response.data;
};
