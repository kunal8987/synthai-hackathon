const express = require("express")
const { UserModel } = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { authenticate } = require("../middleware/authorization")

const userRoute = express()

userRoute.post("/signup",async(req,res)=>{
    const {name,email,password} = req.body
    console.log(req.body)
    try {
        if(!name || ! email || !password){
           return res.json("please provide all credentials")
        }

        const data = await UserModel.find({email})

       
        if(data.length==0){
            bcrypt.hash(password,5,async (err,result)=>{
                if(err){
                    return res.json({error:err.message})
                }
                else{
                    var obj = {
                        name,email,password:result
                    }
                    console.log(obj)
                    var x = UserModel(obj)
                    var k =await x.save()
                    res.json(k)
                }
            })
        }else{
            return res.send("you already registerd")
        }

        
        
        
    } catch (error) {
        console.log(error)
        res.json({error:error.message})
    }
})


userRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {

        var data = await UserModel.find({email})
        console.log(data,password)
        if(data.length==0){
            return res.json("you have to register first")
        }else{
            bcrypt.compare(password,data[0].password,(err,result)=>{
                if(err){
                    console.log(err)
                    res.send("err")
                }else{
                    if(result){
                        const token = jwt.sign(email,"key")
                        console.log(token)
                        
                        res.json({token})
                    }else{
                        
                        res.send("wrong credential!")
                    }
                }
            })
        }
        
    } catch (error) {
        console.log(error)
        res.json({error:error.message})
    }
})



userRoute.get("/",authenticate,(req,res)=>{
    res.send(req.body)
})

async function fun(){
    var x = await UserModel.find();
    console.log(x)
}

// fun()

module.exports = {userRoute}