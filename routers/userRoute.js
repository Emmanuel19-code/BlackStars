const express=require("express");
const router=express.Router();
const {
    createAccount,
    loginAccount,
    logOutAccount
}=require("../controllers/UserAuth");



router.post("/create-account",createAccount);
router.post("/login-account",loginAccount);
router.get("/logOut-account",logOutAccount)


module.exports=router;