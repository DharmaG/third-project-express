const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema (
  {
    fullName: {
      type: String,
      require: [true, 'Please give us your name']
    },
    username: {
      type: String,
      required: [true, 'Username required']
    },
    encryptedPassword: {
      type: String,
      required: [true, 'Password is required']
    }
    // userImage: {
    //   type: String,
    //   required: [true, 'Please provide a picture']
    // }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;
