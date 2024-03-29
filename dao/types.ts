import { type Prisma } from '@prisma/client'

import { type fullSelect } from './queries'

export type JobDescription = Prisma.JobDescriptionGetPayload<{
    select: typeof fullSelect
}>
