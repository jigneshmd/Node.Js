const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 3000
const url =  "mongodb://127.0.0.1:27017/restapi";
mongoose.connect(url).then(()=>{
    console.log("DB Conected");
}).catch(err=>{
    console.log(err);
})
app.use(express.json())

const studentsSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String
    },
    pass : {
        type : String
    },
    joindate : {
        type : Date,
        default : Date.now()
    }
})

const student = new mongoose.model("Student",studentsSchema)

app.get("/students",async(req,resp)=>{
    try {
        const data = await student.find()
        resp.send(data)
    } catch (error) {
        resp.send(err);
    }
})

app.post("/students",async(req,resp)=>{
    try {
        const std = new student(req.body)
        const data = await std.save()
        resp.send(data)
    } catch (error) {
        resp.send(err)
    }
     
})

app.put("/students/:id",async(req,resp)=>{
    const _id = req.params.id
    try {
        const data = await student.findByIdAndUpdate(_id,req.body)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

app.delete("/students/:id",async(req,resp)=>{
    const _id = req.params.id
    try {
        const data = await student.findByIdAndDelete(_id)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

app.listen(PORT,()=>{
    console.log("server runing on port :" +PORT);
})