const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const UserProfile=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"please provide your full name"]
    },
     lastname:{
        type:String,
        required:[true,"please provide your full name"]
    },
    email:{
        type:String,
         match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
        required:[true,"please provide your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide your password"]
    }
})

//hashing of the password is done here
UserProfile.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserProfile.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.firstname },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  )
}

UserProfile.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports=mongoose.model("user",UserProfile);