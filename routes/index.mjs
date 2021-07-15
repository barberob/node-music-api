import songs from './songs.mjs'

export default app => {
    app.use('/songs', songs)
    app.use('/', (req, res) => {
        res.json({ status: active })
    })
}
