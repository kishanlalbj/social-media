const { verify } = require('jsonwebtoken')
const Notification = require("../models/Notifications");
const verifyJwt = require('../middlewares/verifyJwt');
const router = require('express').Router()


router.get('/', verifyJwt, async (req, res, next) => {
    try {

        const notifications = await Notification.find({
            to: req.user.id,
            read: false
        }).populate('from to', 'firstName lastName avatar').lean()


        res.send(notifications)
    } catch (error) {
        next(error)
    }
})


module.exports = router

