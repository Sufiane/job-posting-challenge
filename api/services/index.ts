import { Router, type Response, type Request, type NextFunction, RequestHandler } from 'express';
import { validateRequest } from 'zod-express-middleware';

import dao from '../../dao'
import { ValidationError } from './custom-error';
import { createJobSchema, paramsSchema, updateJobSchema } from '../schemas';

export const router = Router()

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

router.get('/:id', validateRequest({
    params: paramsSchema,
}), async (req, res) => {
    try {
        const jobId = req.params.id

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

router.post('/:id', validateRequest({
    params: paramsSchema,
    body: updateJobSchema,
}), async (req, res) => {
    try {
        const jobId = req.params.id
        const payload = req.body

        await dao.update(jobId, payload)

        return res
            .status(200)
            .send('successfully updated job description')
    } catch (e) {
        return errorHandler(res, `Error while updating job description ${req.params.id}`, e)
    }
})

router.delete('/:id', validateRequest({
    params: paramsSchema,
}), async (req, res) => {
    try {
        const jobId = req.params.id

        await dao.deleteJobDescription(jobId)

        return res
            .status(200)
            .send('successfully deleted job description')
    } catch (e) {
        return errorHandler(res, `Error while deleting job description ${req.params.id}`, e)
    }
})

router.post('/', validateRequest({
    body: createJobSchema,
}), async (req, res) => {
    try {
        const payload = req.body

        await dao.create(payload)

        return res
            .status(200)
            .send('successfully created job description')
    } catch (e) {
        return errorHandler(res, 'Error while creating job description', e)
    }
})
