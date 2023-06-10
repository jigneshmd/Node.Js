const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
const PORT = process.env.PORT
const DBURL = process.env.DB_URL
app.use(express.json())
mongoose.connect(DBURL).then(()=>{
    console.log("DB Connected");
}).catch(err=>{
    console.log(err);
})
   

app.use("/",require("../router/usersrouter"))
app.use("/categories",require("../router/categoryrouter"))
app.use("/products",require("../router/productrouter"))
app.use("/carts",require("../router/cartrouter"))



app.listen(PORT,()=>{
    console.log("Server runing on port : "+PORT);
})