import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().optional(),
  status: z.enum(['active', 'inactive', 'draft']).optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  volunteer_id: z.union([z.string(), z.number()]).optional(),
  image: z.union([z.instanceof(File), z.string()]).optional(),
});
