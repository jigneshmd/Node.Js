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

    const prod = new product({name:"Pen",price:50,qty:5})
    prod.save().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
    })
}

    const addManyproduct = ()=>{
        const p1 = new product({name:"speaker",price:5000,qty:10})
        const p2 = new product({name:"Laptop",price:25000,qty:15})
        const p3 = new product({name:"Mouse",price:500,qty:100})

        product.insertMany([p1,p2,p3]).then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(err);
        })
    }

const  viewproducts = async ()=>{

    try {
        const data = await product.find()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const updateproduct= async()=>{
    try {

       const data =  await product.findByIdAndUpdate("646dffbfceb3a2958cd969fc",{price:50000})
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

const deleteproduct = async ()=>{
    try {
        const data = await product.findByIdAndDelete("646dffbfceb3a2958cd969fd")
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const updateManyproduct=()=>{
    
    product.updateMany({price:{$gt:5000}},{qty:50}).then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
    })
} 
 



// addProduct()
// addManyproduct()
// viewproducts()    
// updateproduct()
// deleteproduct()
// updateManyproduct()