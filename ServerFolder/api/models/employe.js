const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
fname:{type:String},
lname:{type:String},
gender:{type:String},
email:{type:String},
qualification: {type:String},
hobbies: {type:Array},
address: {type:String},
state: {type:String},
city: {type:String},
pin: {type:Number},
calnder:{type:String},
contact:{type:Number},
profpic:{type:String},
salary:{type:Number},
skills:{type:Array}

});




module.exports=mongoose.model('Employee',employeeSchema);