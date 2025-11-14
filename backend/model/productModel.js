import mongoose from 'mongoose'

const productSchema =new mongoose.Schema(
{
name :{
    type:String,
    required:true
},
description:{
    type:String,
    require:true
},
price:{
    type:Number,
    required:true
},
image:{
    type:Array,
    required:true
},
category:{
    type:String,
    required:true
},
subCategory:{
    type:String,
    required:true
},
sizes:{
    type:Array,
    required:true
},
bestSeller:{
    type:boolean  
},
date:{
    type:Number,
    required:true
}
}
)
const productModel = mongoose.model("product",productSchema)

export default productModel