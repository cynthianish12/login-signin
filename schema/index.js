
const mongoose = require("mongoose")

// layour of credentials
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true  },
    password:{type:String,required:true}  
});

// collection , model
module.exports = mongoose.model("user",UserSchema);