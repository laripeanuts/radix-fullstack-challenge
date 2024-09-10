import { useMutation } from '@tanstack/react-query';

import { equipmentsCreate } from '@/http/services/equipments/create';

export const useEquipmentsCreate = () =>
  useMutation({
    mutationKey: ['equipments', 'create'],
    mutationFn: equipmentsCreate,
  });
