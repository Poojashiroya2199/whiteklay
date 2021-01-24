var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   name:String,
   size:Number,
   description:String,
   _enabled:Boolean
});
module.exports = mongoose.model('organization', userSchema,"organizations");   