import { Equipment } from '@/@types/entities/equipment';
import { api } from '../../infra/api';

export const equipmentsGetAll = async (): Promise<Equipment[]> => {
  const response = await api.get('/equipments');

  return response.data.equipments as Equipment[];
};
