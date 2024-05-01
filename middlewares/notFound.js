const notFound = (req, res, next) => {
    res.status(404).json({ message: `${req.originalUrl} not found` })

    next()
}

module.exports = notFound