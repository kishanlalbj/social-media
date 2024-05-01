let liveUsers = [];

const addUser = (user, socketId) => {
  const idx = liveUsers.findIndex((u) => u.id === user);

  if (idx === -1) {
    liveUsers.push({ id: socketId, user });
  }

  console.log(liveUsers)
};

const removeUser = (socketId) => {
    liveUsers =  liveUsers.filter(u => u?.id !== socketId)
}

const findSocketId = user => {
  const person = liveUsers.find(u => u.user === user)
  return person?.id
}

module.exports = {
  addUser,
  removeUser,
  findSocketId
};
