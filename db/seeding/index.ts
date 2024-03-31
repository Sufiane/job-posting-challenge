import { open } from 'node:fs/promises'
import path from 'node:path'

import { db } from '../index'
import { logger } from '../../logger'

interface JsonLine {
    text: string
    cats: {
        responsibility: number
        benefit: number
        node: number
        education: number
        experience: number
        soft: number
        tech: number
    }
}

async function seeding(): Promise<void> {
    const fileHandle = await open(path.join(__dirname, '/sentences.jsonl'))

    for await (const rawLine of fileHandle.readLines()) {
        const line: JsonLine = JSON.parse(rawLine)

        await db.jobDescription.create({
            data: {
                text: line.text,
                hasBenefits: Boolean(line.cats.benefit),
                isSoft: Boolean(line.cats.soft),
                requireEducation: Boolean(line.cats.education),
                isTech: Boolean(line.cats.tech),
                hasResponsibilities: Boolean(line.cats.responsibility),
                requireExperience: Boolean(line.cats.experience),
            },
        })
    }
}

void seeding()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        logger.error('Error while seeding', e)

        await db.$disconnect()

        process.exit(1)
    })
