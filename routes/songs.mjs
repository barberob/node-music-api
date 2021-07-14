import { Router } from 'express'

import { SongModel } from '../database/models.mjs'

import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types
const router = Router()

router.get('/', async (req, res) => {
    try {
        const songs = await SongModel.find({})
        res.json(songs)
    } catch (e) {
        res.json({
            error: true,
            message: `error while retrieving songs : ${e.message}`
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const song = await SongModel.findById(new ObjectId(req.params.id))
        res.json(song)
    } catch (e) {
        res.status(404)
        res.json({
            error: true,
            message: `no song found with id ${req.params.id}`
        })
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        await SongModel.deleteOne({ _id: new ObjectId(req.params.id) })
        res.status(200)
        res.json({
            error: false,
            message: `song with id ${req.params.id} deleted successfully`
        })
    } catch (e) {
        res.status(404)
        res.json({
            error: true,
            message: `song with id ${req.params.id} don't exists`
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const song = await SongModel.find({ _id: new ObjectId(req.params.id) })
        if (!song.length) throw new Error(`Book don't exists`)
        await SongModel.updateOne(
            { _id: new ObjectId(req.params.id) },
            req.body
        )
        res.json({
            error: false,
            message: `book with id ${req.params.id} updated successfully`
        })
    } catch (e) {
        res.status(400)
        res.json({
            error: true,
            message: `error updating song ${req.params.id}: ${e.message}`
        })
    }
})

router.put('/', async (req, res) => {
    try {
        await SongModel.create(req.body)

        res.json({
            error: false,
            message: 'Song created successfully'
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
