// Load required packages
var mongoose = require('mongoose');
const Role = require('./Role');

// Define our token schema
var UserSchema   = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]

});
// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);