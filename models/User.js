const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String
    },
    city: {
      type: String,
    },
    country: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please give a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    following: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    followers: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt)

    this.password = hashed

    next()
})

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


const User = mongoose.model('user', UserSchema)

module.exports = User;