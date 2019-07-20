const mongoose = require('mongoose');


const registrationSchema = mongoose.Schema({
name: {type:String},
email: {type:String},
password: {type:String},
});

module.exports=mongoose.model('registration',registrationSchema);