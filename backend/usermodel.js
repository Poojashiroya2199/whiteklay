var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   name:String,
   email:String,
   role:String,
   organization:String,
   _enabled:Boolean
});
module.exports = mongoose.model('user', userSchema);   