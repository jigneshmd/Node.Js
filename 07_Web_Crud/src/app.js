const express = require("express")
const app = express()
const mongoose = require("mongoose")
const hbs = require("hbs")
const path = require("path")
var cookieParser = require('cookie-parser')
require("dotenv").config()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
var bodyParser = require('body-parser')
app.use(cookieParser())

mongoose.connect(DB_URL).then(()=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
})

app.use(bodyParser.urlencoded({ extended : false }))

const viewpath = path.join(__dirname,"../templets/views")
const partialpath = path.join(__dirname,"../templets/partials")
const publicpath = path.join(__dirname,"../public")

app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialpath)
app.use(express.static(publicpath))

app.use("/",require("../router/userrouter"))

app.listen(PORT,()=>{
    console.log("server running on port : "+PORT);
})