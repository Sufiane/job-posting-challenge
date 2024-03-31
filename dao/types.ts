import { type Prisma } from '@prisma/client'

import { type fullSelect } from './queries'

export type JobDescription = Prisma.JobDescriptionGetPayload<{
    select: typeof fullSelect
}>

export interface UpdatePayload extends Partial<CreatePayload> {}

export interface CreatePayload {
    text: string
    isSoft: boolean
    isTech: boolean
    hasBenefits: boolean
    hasResponsibilities: boolean
    requireEducation: boolean
    requireExperience: boolean
}
