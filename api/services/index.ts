import { Router } from 'express';

import dao from '../../dao'

export const router = Router()

const isNumeric = (val: string): boolean => {
    return !isNaN(Number(val));
}

router.get('/:id', async (req, res) => {
    if (!isNumeric(req.params.id)) {
        return res
            .status(400)
            .send('Id must be a number')
    }

    const jobId = Number(req.params.id)

    try {
        const jobDescription = await dao.getOne(jobId)

        if (!jobDescription) {
            return res
                .status(404)
                .send('Job description not found.')
        }

        return res
            .status(200)
            .send(jobDescription)
    } catch (e) {
        console.error(`Error while getting job description ${jobId}`, e)

        return res
            .status(500)
            .send('An error occurred. Please contact the admin.')
    }
})
