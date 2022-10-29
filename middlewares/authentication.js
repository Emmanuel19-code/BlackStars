const user=require("../models/UserSchema")
const jwt=require('jsonwebtoken')



const verifyUser=async (req,res,next)=>{
      const authHeader=req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer')){
    res.json({msg:"authentication invalid"})
  }
  try {
    if(authHeader){
      const token=authHeader.split(' ')[1]
      const payload=jwt.verify(token,process.env.JWT_SECRET)
       req.user={userId:payload.userId,firstname:payload.firstname}
       next()
    }
    
  } catch (error) {
     res.json({msg:"authentication invalid"})
  }
}



module.exports={
  verifyUser
}