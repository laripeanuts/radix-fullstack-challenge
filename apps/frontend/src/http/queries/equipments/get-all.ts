import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { Equipment } from '@/@types/entities/equipment';
import { equipmentsGetAll } from '@/http/services/equipments';

export const useEquipmentsGetAll = (
  options?: DefinedInitialDataOptions<Equipment[]>,
) =>
  useQuery<Equipment[]>({
    ...options,
    queryKey: ['users', 'sign-up'],
    queryFn: equipmentsGetAll,
  });
