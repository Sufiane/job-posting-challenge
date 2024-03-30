import { db } from '../db/'
import { CreatePayload, JobDescription, UpdatePayload } from './types';

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

export async function create(payload: CreatePayload): Promise<void> {
    await db.jobDescription.create({
        data: payload,
    })
}

export async function get({ filtering, sorting, skip }: {
    skip?: number,
    sorting?: 'asc' | 'desc',
    filtering?: {
        isSoft?: boolean
        isTech?: boolean
        hasBenefits?: boolean
        hasResponsibilities?: boolean
        requireEducation?: boolean
        requireExperience?: boolean
    }
}): Promise<JobDescription[]> {
    return db.jobDescription.findMany({
        select: fullSelect,
        take: 5,
        skip: (skip ?? 0) * 5,
        orderBy: {
            id: sorting ?? 'asc',
        },
        where: {
            ...filtering,
        },
    })
}
