import express from 'express'
import bodyParser from 'body-parser'

import { db } from './db'

import { jobsRoutes, translationRoutes } from './api'
import { logger } from './logger'

const app = express()
const PORT = process.env.PORT ?? 7777

app.use(bodyParser.json())

async function start(): Promise<void> {
    // Making sure we're connected to the db before starting
    await db.$connect()

    app.use('/jobs', jobsRoutes)
    app.use('/translation', translationRoutes)

    app.listen(Number(PORT), '0.0.0.0', () => {
        logger.info(`Project started on port ${PORT}`)
    })
}

void start().catch(async (e) => {
    logger.error('Error starting project', e)

    await db.$disconnect()

    process.exit(1)
})
