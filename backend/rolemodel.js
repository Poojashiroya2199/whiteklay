var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   name:String,
   description:String,
   _enabled:Boolean
});
module.exports = mongoose.model('role', userSchema,"roles");   