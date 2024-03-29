import { Router, type Response } from 'express';

import dao from '../../dao'
import { ValidationError } from './custom-error';

export const router = Router()

const isNumeric = (val: string): boolean => {
    return !isNaN(Number(val));
}

const validateId = (id: string): number => {
    if (!isNumeric(id)) {
        throw new ValidationError('Id must be a number')
    }

    return Number(id)
}

const validateBody = (body?: Record<string, unknown>): Record<string, unknown> => {

    if (body == null || Object.keys(body).length === 0) {
        throw new ValidationError('form can not be empty.')
    }

    return body
}

const errorHandler = (res: Response, customErrorMessage: string, e: unknown) => {
    if (e instanceof ValidationError) {
        return res
            .status(400)
            .send(e.message)
    }

    console.error(customErrorMessage, e)

    return res
        .status(500)
        .send('An error occurred. Please contact the admin.')
}

router.get('/:id', async (req, res) => {
    try {
        const jobId = validateId(req.params.id)

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
        return errorHandler(res, `Error while getting job description ${req.params.id}`, e)
    }
})

router.post('/:id', async (req, res) => {
    try {
        const jobId = validateId(req.params.id)
        const payload = validateBody(req.body)

        await dao.update(jobId, payload)

        return res.status(200)
            .send('successfully updated job description')
    } catch (e) {
        return errorHandler(res, `Error while updating job description ${req.params.id}`, e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const jobId = validateId(req.params.id)

        await dao.deleteJobDescription(jobId)

        return res.status(200)
            .send('successfully deleted job description')
    } catch (e) {
        return errorHandler(res, `Error while deleting job description ${req.params.id}`, e)
    }
})
