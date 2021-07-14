import next from 'express'

export default (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'AllowAnyMethod',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
}
