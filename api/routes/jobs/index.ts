import { Router, type Response } from 'express'
import { processRequest } from 'zod-express-middleware'

import dao from '../../../dao'
import { ValidationError } from '../custom-error'
import {
    createJobSchema,
    getJobsSchema,
    paramsSchema,
    updateJobSchema,
} from './schemas'
import { logger } from '../../../logger'

export const router = Router()

const errorHandler = (
    res: Response,
    customErrorMessage: string,
    e: unknown
): Response => {
    if (e instanceof ValidationError) {
        return res.status(400).send(e.message)
    }

    logger.error(customErrorMessage, e)

    return res.status(500).send('An error occurred. Please contact the admin.')
}

router.get(
    '/:id',
    processRequest({
        params: paramsSchema,
    }),
    async (req, res) => {
        const jobId = req.params.id

        logger.info(`Getting job ${jobId}`)

        try {
            const jobDescription = await dao.getOne(jobId)

            if (!jobDescription) {
                return res.status(404).send('Job description not found.')
            }

            return res.status(200).send(jobDescription)
        } catch (e) {
            return errorHandler(
                res,
                `Error while getting job description ${req.params.id}`,
                e
            )
        }
    }
)

router.post(
    '/:id',
    processRequest({
        params: paramsSchema,
        body: updateJobSchema,
    }),
    async (req, res) => {
        const jobId = req.params.id

        logger.info(`updating job ${jobId}`)

        try {
            const payload = req.body

            await dao.update(jobId, payload)

            return res.status(200).send('successfully updated job description')
        } catch (e) {
            return errorHandler(
                res,
                `Error while updating job description ${req.params.id}`,
                e
            )
        }
    }
)

router.delete(
    '/:id',
    processRequest({
        params: paramsSchema,
    }),
    async (req, res) => {
        const jobId = req.params.id

        logger.info(`deleting job ${jobId}`)

        try {
            await dao.deleteJobDescription(jobId)

            return res.status(200).send('successfully deleted job description')
        } catch (e) {
            return errorHandler(
                res,
                `Error while deleting job description ${req.params.id}`,
                e
            )
        }
    }
)

router.post(
    '/',
    processRequest({
        body: createJobSchema,
    }),
    async (req, res) => {
        logger.info('creating new job')

        try {
            const payload = req.body

            await dao.create(payload)

            return res.status(200).send('successfully created job description')
        } catch (e) {
            return errorHandler(res, 'Error while creating job description', e)
        }
    }
)

router.get(
    '/',
    processRequest({
        query: getJobsSchema,
    }),
    async (req, res) => {
        logger.info('getting job list')

        try {
            const filtering = {
                isSoft: req.query?.isSoft,
                isTech: req.query?.isTech,
                hasBenefits: req.query?.hasBenefits,
                hasResponsibilities: req.query?.hasResponsibilities,
                requireEducation: req.query?.requireEducation,
                requireExperience: req.query?.requireExperience,
            }

            const dbResult = await dao.get({
                filtering,
                sorting: req.query?.id,
                skip: req.query?.skip,
            })

            return res.status(200).send(dbResult)
        } catch (e) {
            return errorHandler(
                res,
                'Error while getting list of job description',
                e
            )
        }
    }
)
