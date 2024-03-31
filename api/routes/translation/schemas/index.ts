import { z } from 'zod'

export const paramsSchema = z.object({
    jobId: z.coerce.number(),
})
