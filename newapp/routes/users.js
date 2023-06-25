const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/dbname");

const userSchema= mongoose.Schema({
  fullname:String,
  email:String,
  profileImage:String,
  likes:{
  type:Number,
  default:0,
 }
})
module.exports= mongoose.model("user",userSchema);