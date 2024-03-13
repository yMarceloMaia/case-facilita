import { z } from 'zod';

export const ClientSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    phone_number: z.string().min(1).max(20),
    coordinate_x: z.number(),
    coordinate_y: z.number(),
});
