import { Router } from 'express'
import { processRequest } from 'zod-express-middleware'

import { paramsSchema } from './schemas'
import dao from '../../../dao'
import { translate } from '../../../services/deepl'

export const router = Router()

router.get(
    '/:jobId',
    processRequest({
        params: paramsSchema,
    }),
    async (req, res) => {
        const jobDescription = await dao.getOne(req.params.jobId)

        if (!jobDescription) {
            return res.status(404).send('No job description found.')
        }

        const translation = await translate(jobDescription.text)

        return res.status(200).send(translation)
    }
)
