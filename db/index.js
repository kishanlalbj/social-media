const mongoose = require('mongoose');

const connString = process.env.MONGO_CONN_STRING


mongoose.connect(connString).then(() => {
    console.log("Database connected")
}).catch((err) => {
    // console.error(err)
})


mongoose.connection.on('connected', () => {
    console.log("Mongodb connection successful")
})


mongoose.connection.on('disconnected', () => {
    console.log("Mongodb conenction disconnected")
})


mongoose.connection.on('error', (err) => {
    console.error(err)
})


module.exports = mongoose