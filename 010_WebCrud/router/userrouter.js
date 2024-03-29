const router = require("express").Router()
const User = require("../model/user")
const auth = require("../middleware/auth")
const bcrypt = require("bcryptjs")
const multer = require("multer")
const fs = require("fs")


const storageEngine = multer.diskStorage({
    destination : "./public/img",
    filename : (req, file, cb) =>{
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const upload = multer ({
    storage : storageEngine,
});

router.get("/",(req,resp)=>{
    resp.render("login")
})

router.get("/reg",(req,resp)=>{
    resp.render("reg")
})

router.post("/do_register",upload.single("file"),async(req,resp)=>{
    // const user = req.body
    // console.log(user);   
    try {
        const user = new User({
            Fname : req.body.Fname,
            Lname : req.body.Lname,
            address : req.body.address,
            Course : req.body.Course,
            Emailid : req.body.Emailid,
            Password : req.body.Password,
            Image : req.file.filename
        })
          const udata =  await user.save()  
        // console.log(udata);  
        resp.render("reg",{msg : "Registration Successfully Done !!!!"})
        
    } catch (error) {
        console.log(error);
    }
})

router.get("/viewuser",auth,async(req,resp)=>{
    try {
        const data = await User.find({_id:req.user._});
        resp.render("view",{userdata:data})
    } catch (error) {
        console.log(error);
    }
})

router.get ("/deleteuser",async(req,resp)=>{    
    try {
        const id = req.query.uid
        const udata =  await User.findByIdAndDelete(id)
        fs.unlinkSync("public/img/"+udata.Image)
        resp.redirect("viewuser")
    } catch (error) {
        console.log(error);
    }
})

router.get ("/edituser",async(req,resp)=>{
    try {
        const id = req.query.uid
        const data = await User.findOne({_id : id})
        resp.render("update",{data:data})     
    } catch (error) {
        console.log(error);
    }
})

router.post ("/do_update",upload.single("file"),async(req,resp)=>{
    try {
        const id = req.body.id
         const udata = await User.findByIdAndUpdate(id,{
            Fname : req.body.Fname,
            Lname : req.body.Lname,
            address : req.body.address,
            Course : req.body.Course,
            Emailid : req.body.Emailid,
            Password : req.body.Password,
            Image : req.file.filename
        })
        fs.unlinkSync("public/img/"+udata.Image)
        resp.redirect("viewuser")
    } catch (error) {
        console.log(error);
    }
})

router.post ("/do_login",async(req,resp)=>{ 
    try {
          const user = await User.findOne({Emailid:req.body.Emailid})

        if (user.Tokens.length>=2) {
            resp.render("login",{err:"Max user limit reached"})
        return; 
        }

          const isValid = await bcrypt.compare(req.body.Password,user.Password)

        if (isValid)
        {
          
          const token = await user.generateToken()
             
            resp.cookie("jwt",token)
            resp.redirect("viewuser")
        }
        else {  
            resp.render("login",{err:"Invalid credentials !!!"})
        }
    } catch (error) {
        resp.render("login",{err:"Invalid credentials !!!"})
    }
})

router.get ("/logout",auth,async(req,resp)=>{
    try {
        
    
        const user = req.user
        const token = req.token 

        user.Tokens = user.Tokens.filter(ele=>{
            return  ele.token!=token
        })

        user.save()
        resp.clearCookie("jwt")
        resp.render("login")

    } catch (error) {
        console.log(error);
    }
})
router.get ("/logoutall",auth,async(req,resp)=>{
    try {

        const user = req.user
        const token = req.token 

        user.Tokens = []

        user.save()

        resp.clearCookie("jwt")

        resp.render("login")

    } catch (error) {
        console.log(error);
    }
})

module.exports = router