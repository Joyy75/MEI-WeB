import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  images: z
    .any()
    .refine((files) => !files || Array.isArray(files), { message: 'Images must be an array' })
    .optional(),
  start_date: z.string().min(1, 'Date of birth is required'),
});
