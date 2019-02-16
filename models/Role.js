// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var RoleSchema   = new mongoose.Schema({
  name: { type: String, required: true },

});

// Export the Mongoose model
module.exports = mongoose.model('Role', RoleSchema);