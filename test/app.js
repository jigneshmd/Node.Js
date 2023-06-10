// const bcrypt = require("bcryptjs")
// const passHash =async (pass)=>{

//         const hpass = await bcrypt.hash(pass,10)
//        const isMatch =  await bcrypt.compare("hello",hpass)
//        console.log(isMatch);
// }

// passHash("Hello")
 
const jwt = require("jsonwebtoken")
const getToken=async()=>{
    try {
        
        const token = await jwt.sign({_id:123},"thisismysecretkey")
        console.log(token);
    
        const data = await jwt.verify(token,"thisismysecretkey")
        console.log(data);


    } catch (error) {
        console.log(error);
    }
}

getToken()