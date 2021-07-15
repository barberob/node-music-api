import { Router } from 'express'
import mongoose from 'mongoose'

import { SongModel } from '../database/models.mjs'

const { ObjectId } = mongoose.Types
const router = Router()

const songExists = async ({ name, artist, album }) => {
    return await SongModel.exists({ name, artist, album })
}

//Ici on aurait pu utiliser PUT, PATCH, DELETE... mais cela pose des problèmes de CORS

router.get('/', async (req, res) => {
    try {
        const songs = await SongModel.find({})
        res.json(songs)
    } catch (e) {
        res.json({
            error: true,
            message: `Error while retrieving songs : ${e.message}`
        })
    }
})

router.get('/search/:searchValue', async (req, res) => {
    try {
        const songs = await SongModel.aggregate([
            {
                $match: {
                    $or: [
                        {
                            title: {
                                $regex: req.params.searchValue,
                                $options: 'i'
                            }
                        },
                        {
                            artist: {
                                $regex: req.params.searchValue,
                                $options: 'i'
                            }
                        },
                        {
                            album: {
                                $regex: req.params.searchValue,
                                $options: 'i'
                            }
                        }
                    ]
                }
            }
        ])
        res.json(songs)
    } catch (e) {
        res.json({
            error: true,
            message: `Error while retrieving songs : ${e.message}`
        })
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        await SongModel.deleteOne({ _id: new ObjectId(req.params.id) })
        res.status(200)
        res.json({
            error: false,
            message: `Song with id ${req.params.id} deleted successfully`
        })
    } catch (e) {
        res.status(404)
        res.json({
            error: true,
            message: `Song with id ${req.params.id} don't exists`
        })
    }
})

router.post('/update', async (req, res) => {
    try {
        if (await songExists(req.body)) {
            res.json({ error: true, exists: true })
            return
        }
        const song = await SongModel.find({ _id: new ObjectId(req.body._id) })
        if (!song.length) throw new Error(`Song don't exists`)
        await SongModel.updateOne({ _id: new ObjectId(req.body._id) }, req.body)
        res.json({
            error: false,
            message: `Song with id ${req.params.id} updated successfully`
        })
    } catch (e) {
        res.status(400)
        res.json({
            error: true,
            message: `Error updating song ${req.params.id}: ${e.message}`
        })
    }
})

router.post('/add', async (req, res) => {
    try {
        if (await songExists(req.body)) {
            res.json({ error: true, exists: true })
            return
        }
        const song = await SongModel.create(req.body)
        res.json({
            error: false,
            message: 'Song created successfully',
            song
        })
    } catch (e) {
        res.status(400)
        res.json({
            error: true,
            message: e.message
        })
    }
})
export default router
