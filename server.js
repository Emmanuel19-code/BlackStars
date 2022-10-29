const express = require("express");
const app = express();
const port = 3000 || process.env.PORT
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./connect");
const user_route = require("./routers/userRoute")
const player = require("./routers/createPlayers")
const {verifyUser} = require("./middlewares/authentication")
dotenv.config();

app.use(cors());
app.use(express.json())

app.use("/authentication",user_route);
app.use("/blackstar",verifyUser,player)








app.listen(port,()=>{
    console.log("connected");
});

const start=async()=>{
    try{
        await connection(process.env.MONGO_URI);
    }
    catch(error){
      console.log("an error occured with the database");
    }
}

start();