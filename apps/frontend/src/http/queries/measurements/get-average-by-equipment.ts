import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import {
  MeasurementsAverageByEquipmentsIntervals,
  measurementsGetAverageByEquipment,
} from '@/http/services/measurements/get-average-by-equipment';

export const useMeasurementsGetAverageByEquipment = (
  equipmentId?: string | null,
  options?: DefinedInitialDataOptions<MeasurementsAverageByEquipmentsIntervals>,
) =>
  useQuery<MeasurementsAverageByEquipmentsIntervals>({
    ...options,
    queryKey: ['measurements', 'get-average-by-equipment'],
    queryFn: () =>
      measurementsGetAverageByEquipment({ equipmentId: equipmentId! }),
    enabled: !!equipmentId,
  });
