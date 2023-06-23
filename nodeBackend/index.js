const express = require("express")
const passport =  require("passport")
const app = express()
var cookieParser = require('cookie-parser')
var cors = require("cors")
const { connection } = require("./config/db")
const { userRoute } = require("./routes/user")

app.use(cors())
app.use(express.json())
app.use(cookieParser())
var token = ""
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "543549038023-t5qmfotps2mra00lnr05l2pbo5jr57gb.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/auth/google/callback"
                  
  },
  async function(accessToken, refreshToken, profile, cb) {

    token = accessToken
    console.log(refreshToken)
    return cb(null,"user")
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' ,session:false}),(req, res)=> {
    // Successful authentication, redirect home.
    res.redirect('http://127.0.0.1:5500/frontend/index.html');
  });



app.use("/user",userRoute)


app.get("/home",(req,res)=>{
    
    res.send(token)
})




app.get("/login",(req,res)=>{
    res.send("login")
})

app.get("/token",(req,res)=>{
    res.json({token})
})


app.listen(8080,async ()=>{
  try {
    await connection
  } catch (error) {
    console.log(error)
  }
    console.log("server is running")
})