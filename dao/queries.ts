import { db } from '../db/'
import { JobDescription } from './types';

export const fullSelect = {
    id: true,
    text: true,
    isSoft: true,
    isTech: true,
    hasBenefits: true,
    hasResponsibilities: true,
    requireEducation: true,
    requireExperience: true,
}

export async function getOne(id: number): Promise<JobDescription | null> {
    return db.jobDescription.findUnique({
        select: fullSelect,
        where: {
            id,
        },
    })
}
