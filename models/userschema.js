const mongoose= require("mongoose")

const userSchema = new mongoose.Schema({

    name :{
        type : String,
        required : true
    },
    id :{
        type : Number,
        required: true
    },
    mobileno:{
        type : String,
        maxlength: 10,
        minlength: 10
        // required : true
    }
})

module.exports = mongoose.model("userSchema",userSchema)