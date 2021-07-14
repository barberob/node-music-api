import mongoose from 'mongoose'
const { Schema } = mongoose

const SongModel = mongoose.model(
    'Song',
    new Schema({
        title: { type: String, required: true },
        artist: { type: String, required: true },
        album: { type: String, required: true },
        released_at: { type: Date, required: false }
    }),
    'list'
)

export { SongModel }
