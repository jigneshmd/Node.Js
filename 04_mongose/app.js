const mongoose = require("mongoose")

dburl = "mongodb://127.0.0.1:27017/shop";

mongoose.connect(dburl).then(()=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
})

const productschema = new mongoose.Schema({

    name :{
        type : String
    },
    price:{
        type : Number
    },
     qty :{
        type : Number
    },
})

const product = new mongoose.model("product",productschema)

const addProduct =()=>{

    const prod = new product({Name:"Pen",price:50,qty:5})
    prod.save().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
    })
}

// addProduct()
