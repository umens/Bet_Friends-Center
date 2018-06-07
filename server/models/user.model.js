const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
  usermane: String,
  email: String,
  picture: String,
});

module.exports = Mongoose.model('User', UserSchema);
