import { z } from 'zod';

export const volunteerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  position: z.string().min(1, 'Position is required'),
  batch: z.string().min(1, 'Batch is required'),
  team: z.string().optional(),
  dob: z.string().min(1, 'Date of birth is required'),
  department: z.string().min(1, 'Department is required'),
  image: z.union([z.instanceof(File), z.string()]).optional(),
});
