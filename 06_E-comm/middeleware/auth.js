const jwt = require("jsonwebtoken")
const User = require("../model/users")

const auth = async(req,resp,next)=>{
    // console.log("auth calling" );
    // next()
    const token = req.header("auth-token")
    // console.log(token);
    try {
        const data = await jwt.verify(token,process.env.S_KEY)
        if (data) 
        {
            const user = await User.findOne({_id:data._id})
            req.user = user;
            next()
        } 
        else
        {
            resp.send("Invalid token")
        }
    } catch (error) {
        resp.send("Invalid token")
    }
}

 
module.exports=auth 