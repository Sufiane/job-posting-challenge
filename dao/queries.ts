import { db } from '../db/'
import { JobDescription, UpdatePayload } from './types';

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

export async function update(id: number, payload: UpdatePayload): Promise<void> {
    await db.jobDescription.update({
        data: payload,
        where: {
            id,
        },
    })
}

export async function deleteJobDescription(id: number): Promise<void> {
    await db.jobDescription.delete({
        where: {
            id,
        },
    })
}
