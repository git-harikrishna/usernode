const mongoose= require("mongoose")

const userSchema = new mongoose.Schema({

    name :{
        type : String,
        required : true
    },
    mobileno:{
        type : String,
        maxlength: 10,
        minlength: 10
        // required : true
    },
    password :{
        type : String ,
        minlength : 8
    }
})

module.exports = mongoose.model("userSchema",userSchema)