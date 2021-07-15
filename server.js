import express from 'express'
import dotenv from 'dotenv'

import logger from './middlewares/logger.mjs'
import cors from './middlewares/cors.mjs'

import database from './database/index.mjs'

import routes from './routes/index.mjs'

const startServer = async () => {
    dotenv.config()

    const app = express()
    const port = process.env.PORT || 3000
    const host = process.env.HOST

    app.use(cors)
    app.use(logger)
    app.use(express.json())

    try {
        await database()
    } catch (err) {
        console.error(err)
        process.exit()
    }

    routes(app)

    app.listen(port, host, () => {
        console.log(`Server listening at ${host}:${port}`)
    })
}

startServer()
