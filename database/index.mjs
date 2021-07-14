import mongoose from 'mongoose'

export default async () => {
    return new Promise((resolve, reject) => {
        try {
            if (!process.env.MONGO_URL) {
                reject('Database configuration error')
            }

            const db = mongoose.connection

            db.on('connection', () => {
                console.log('Connection...')
            })

            db.once('open', () => {
                console.log('Connected !')
                resolve()
            })

            db.on('error', error => {
                mongoose.disconnect()
                console.log(error)
                process.exit(1)
            })

            mongoose
                .connect(process.env.MONGO_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                .catch(error => {
                    reject(error)
                })
        } catch (err) {
            reject(err)
        }
    })
}
