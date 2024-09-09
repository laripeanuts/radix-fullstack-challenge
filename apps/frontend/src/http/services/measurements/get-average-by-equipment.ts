import { api } from '../../infra/api';

export interface MeasurementsAverageByEquipmentsRequest {
  equipmentId: string;
}

export interface MeasurementsAverageByEquipmentsIntervals {
  '1d': number;
  '2d': number;
  '1w': number;
  '1m': number;
}

export const measurementsGetAverageByEquipment = async ({
  equipmentId,
}: MeasurementsAverageByEquipmentsRequest): Promise<MeasurementsAverageByEquipmentsIntervals> => {
  const response = await api.get(`/measurements/${equipmentId}/average`);

  return response.data
    .averageByInterval as MeasurementsAverageByEquipmentsIntervals;
};
