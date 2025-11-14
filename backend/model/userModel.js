import mongoose, { mongo }  from "mongoose";

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
cartData:{
    type:Object,
    default:{}
}

},{minimize:false})

//Mongoose has a default behavior: it removes empty objects from documents when saving to MongoDB.
//This is controlled by the minimize option in the schema.
//minimize will store the empty objects even though it is empty 

const userModel = mongoose.model("user",userSchema)

export default userModel