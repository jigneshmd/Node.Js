const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 3000
const url =  "mongodb://127.0.0.1:27017/restapi";
mongoose.connect(url).then(()=>{
    console.log("Db connected");
}).catch(err=>{
    console.log(err);
})
app.use(express.json())
const studentSchema = new mongoose.Schema({
    name : {
        type :String
    },
    email : {
        type : String
    },
    pass :{
        type : String
    },
    joindata : {
        type : Date,
        default:Date.now()
    }
})

const Student = new mongoose.model("Student",studentSchema)
app.get("/",(req,resp)=>{
    resp.send("connected")
})
app.listen(PORT,()=>{
    console.log("server runing on port :" +PORT);
})