import songs from './songs.mjs'

export default app => {
    app.use('/songs', songs)
}
