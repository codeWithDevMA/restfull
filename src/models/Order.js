const mongoose=require("mongoose")
const order_schema=new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,
        ref:'db_product',required:true},
    quantity:{type:String,default:1}
})
module.exports=mongoose.model('db_order',order_schema)