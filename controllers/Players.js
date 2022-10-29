const { StatusCodes } = require("http-status-codes");
const player=require("../models/PlayerSchema");




const createPlayer=async (req,res)=>{
   req.body.createdBy=req.user.userId
  const {firstname,lastname,Age,Position}=req.body
  if(!firstname || !lastname || !Age || !Position){
     res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide the neccessary details"})
  }
  const Profile=await player.create({...req.body})
  res.status(StatusCodes.CREATED).json({msg:"player profile has been created",Profile})
}

const updatePlayer=async(req,res)=>{
     const userId=req.user.userId
     const {id}=req.params
    const {firstname,lastname,Age,Position}=req.body
      const Profile=await player.findOne({
        createdBy:userId,
        _id:id
      })
    if(!Profile){
      res.status(StatusCodes.BAD_REQUEST).json({msg:"Player not found"})
    }
    if(firstname){
       Profile.firstname=firstname
    }
    if(lastname){
      Profile.lastname=lastname
    }
    if(Age){
       Profile.Age=Age
    }
    if(Position){
       Profile.Age=Age
    }
   await Profile.save()
   res.status(StatusCodes.OK).json({msg:"player profile has been updated",Profile})
}

const deletePlayer=async(req,res)=>{
    const userId=req.user.userId
    const {id}=req.params
    const Profile=await player.findOneAndDelete({
        createdBy:userId,
        _id:id
      })
    if(!Profile){
       res.status(StatusCodes.BAD_REQUEST).json({msg:"was not able to delete"})
    }
     res.status(StatusCodes.OK).json({msg:"player profile has been deleted",Profile})
}

module.exports={
    createPlayer,
    updatePlayer,
    deletePlayer
}