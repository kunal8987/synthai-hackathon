const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/userModel")

const authenticate = async (req,res,next)=>{
    const token = req.headers.authorization
    console.log(token)
    try{
        if(token){
            
        var x = jwt.verify(token,"key")
        var body =await UserModel.find({email:x})
        req.body.name = body[0].name;
        req.body.email = x
        next()
        }
        else{
        res.send("You have to login first")
        }
    }catch{
        console.log(error)
        res.json("error in middleware");
    }
}

module.exports = {authenticate}