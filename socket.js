const http = require('http');
const app = require("./app");
const Server = http.Server(app)

const io = require('socket.io')(Server, {
  cors: {
    origin: '*'
  }
});

// io.on('connection', (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

//   socket.on('joined', (data) => {
//       addUser(data, socket.id)
//   })
  
//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected');
//     removeUser(socket.id)
//   });

//   socket.on('talk', (message) => {
//     console.log({message})
//   })

//   socket.on('likedPost', data => {
//     const receiver = liveUsers.find(u => u.id === data.to)
//     socket.to(receiver.socketId).emit('notifyLikedPost', `${data.from} liked your post`)
//   })
// });

module.exports = {
    Server,
    io
}