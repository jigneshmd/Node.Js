const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const URL = process.env.URL
const mongoose = require("mongoose")
const hbs = require("hbs")
const path = require("path")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')         
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(URL).then(result=>{
    console.log("Server Connected !!!");
}).catch(err=>{
    console.log(err);
})

const viewpath = path.join(__dirname, "../temp/views")
const partialpath = path.join(__dirname, "../temp/partials")
const public = path.join(__dirname, "../public")

app.set("view engine", "hbs")
app.set("views", viewpath)
hbs.registerPartials(partialpath)
app.use(express.static("public"))

app.use("/",require("../router/userrouter"))


app.listen(PORT,()=>{
    console.log("Server Runing on port : " + PORT);
})