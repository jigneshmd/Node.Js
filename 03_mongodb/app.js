const mongo = require("mongodb")
const mongoclient = mongo.MongoClient
 
const dburl = "mongodb://127.0.0.1:27017";
const database = "tops";

mongoclient.connect(dburl).then(result=>{

    const mydb = result.db(database)
    console.log("db connected");
    // console.log(result);
    
    //  mydb.createCollection("emp").then(result=>{
    //     console.log("Collection created");
    // })
    // }).catch(err=>{
    //     console.log(err);

    // const emp1 = {name:"jay",email:"jay@gmail.com",dept:"node",sal:10000};
    // mydb.collection("emp").insertOne(emp1).then(result=>{
    //     console.log(result );
    // }).catch(err=>{
    //     console.log(err);
    // })

    // const emp1 = {name:"aryan",email:"aryan@gmail.com",dept:"node",sal:12000};
    // const emp2 = {name:"chirag",email:"chirag@gmail.com",dept:"java",sal:11000};
    // const emp3 = {name:"ritesh",email:"ritesh@gmail.com",dept:"rectnative",sal:15000};
    // const emp4 = {name:"jatin",email:"jatin@gmail.com",dept:"php",sal:13000};

    // mydb.collection("emp").insertMany([emp1,emp2,emp3,emp4]).then(result=>{
    //     console.log(result );
    // }).catch(err=>{
    //     console.log(err);
    // })

    // mydb.collection("emp").find().toArray().then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err); 
    // })

    // mydb.collection("emp").find({name:"ritesh"}).toArray().then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err); 
    // })

    // mydb.collection("emp").find ({name:"jay"},{projection:{name:1,email:1,_id:0}}).toArray().then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err); 
    // })

    // mydb.collection("emp").find({sal:{$lt:12000}}).toArray().then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err); 
    // })

    // mydb.collection("emp").find({$or:[{sal:{$lt:12000}},{dept:{$eq:"java"}}]}).toArray().then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err); 
    // })

    // mydb.collection("emp").findOne({name:"jay"}).then(result=>{
    //     console.log(result.email);
    // }).catch(err=>{
    //     console.log(err); 
    // })
 







}).catch(err=>{
    console.log(err);
})
 