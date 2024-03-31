import { z } from 'zod'

export const paramsSchema = z.object({
    id: z.coerce.number(),
})

export const createJobSchema = z.object({
    text: z.string().min(1),
    isSoft: z.boolean(),
    isTech: z.boolean(),
    hasBenefits: z.boolean(),
    hasResponsibilities: z.boolean(),
    requireEducation: z.boolean(),
    requireExperience: z.boolean(),
})

export const updateJobSchema = createJobSchema.partial()

export const getJobsSchema = z.optional(
    z.object({
        isSoft: z.coerce.boolean().optional(),
        isTech: z.coerce.boolean().optional(),
        hasBenefits: z.coerce.boolean().optional(),
        hasResponsibilities: z.coerce.boolean().optional(),
        requireEducation: z.coerce.boolean().optional(),
        requireExperience: z.coerce.boolean().optional(),
        id: z.enum(['asc', 'desc']).optional(),
        skip: z.coerce.number().optional(),
    })
)
