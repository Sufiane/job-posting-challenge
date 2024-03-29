import { z } from 'zod';


export const paramsSchema = z.object({
    id: z.number(),
})

export const createJobSchema = z.object({
    text: z.string(),
    isSoft: z.boolean(),
    isTech: z.boolean(),
    hasBenefits: z.boolean(),
    hasResponsibilities: z.boolean(),
    requireEducation: z.boolean(),
    requireExperience: z.boolean(),
})

export const updateJobSchema = createJobSchema.partial()
