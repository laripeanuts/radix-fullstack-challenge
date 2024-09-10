import { z } from 'zod';

export const createEquipmentFormSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      message: 'Name field is required',
    })
    .min(3, {
      message: 'Name field must be at least 3 characters',
    }),
  description: z
    .string({
      message: 'Description field is required',
    })
    .min(3, {
      message: 'Description field must be at least 3 characters',
    }),
  status: z.enum(['OPERATIONAL', 'MAINTENANCE', 'OUT_OF_SERVICE'], {
    message: 'Status field is required',
  }),
});

export type CreateEquipmentFormSchema = z.infer<
  typeof createEquipmentFormSchema
>;
