const mongoose=require("mongoose");





const Playerdetails=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"please provide your full name"]
    },
    lastname:{
        type:String,
        required:[true,"please provide your lastname"]
    },
    Age:{
        type:Number,
        required:[true,"please provide player age"]
    },
    Position:{
        type:String,
        required:[true,"please provide player position"]
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
      ref: 'user',
      required: [true, 'Please provide user'],
    }
},{timestamps:true});



module.exports=mongoose.model("player",Playerdetails);