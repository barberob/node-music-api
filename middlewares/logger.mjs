import next from 'express'
import { EOL } from 'node:os'

export default (req, res, next) => {
    const date = new Date()
    console.log(`request: ${date.getTime()} => ${req.method} -> ${req.url}`)

    res.on('finish', () => {
        console.log(`response: ${res.statusCode} ${EOL}`)
    })
    next()
}
