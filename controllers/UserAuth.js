const user = require("../models/UserSchema");
const { StatusCodes } = require('http-status-codes');
const bcrypt=require("bcryptjs")

//creating an account
const createAccount = async(req,res)=>{
      const {email}=req.body.email
    const search=await user.findOne({email})
    if(search){
      res.status(StatusCodes.BAD_REQUEST).json({msg:"A user with email account exist"})
    } 
   const Profile = await user.create(req.body)
  const token= Profile.createJWT()
   res.status(StatusCodes.CREATED).json({
    msg: 'Your Account has been created'
  });
}

//logging in a user
const loginAccount=async(req,res)=>{
  const { email , password }=req.body
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({msg:'Please provide email and password'})
  }
    const Profile = await user.findOne({email})
    if (!Profile) {
       res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid credentials'})
    }

  //compare password
    const isPasswordCorrect = await Profile.comparePassword(password)
    if (!isPasswordCorrect) {
      res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid credentials'})
    }
   const isMatch=bcrypt.compare(password,Profile.password)
    if(!isMatch){
     res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid credentials'})
    }
  const token = Profile.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: Profile.firstname }, token })

}


//logOut users
const logOutAccount=(req,res)=>{
    res.json({msg:"logout"})
}

module.exports={
    createAccount,
    loginAccount,
    logOutAccount
}