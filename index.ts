import express from 'express'
import bodyParser from 'body-parser';

import { db } from './db';

import { router } from './api'

const app = express()
const port = 7777

app.use(bodyParser.json())

async function start() {
    // Making sure we're connected to the db before starting
    await db.$connect()

    app.use('/', router)

    app.listen(port, () => {
        console.log('Project started')
    })
}

void start()
    .catch(async (e) => {
        console.error('Error starting project', e)

        await db.$disconnect()

        process.exit(1)
    })
