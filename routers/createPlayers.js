const express=require("express");
const router=express.Router();

const {
    createPlayer,
    updatePlayer,
    deletePlayer
}=require("../controllers/Players")


router.post("/create-player",createPlayer)
router.patch("/player/:id",updatePlayer)
router.delete("/player/:id",deletePlayer)



module.exports=router