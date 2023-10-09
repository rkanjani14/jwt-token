import express from "express";
const Router = express.Router()
import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
const secretKey = "secret_key"


const  authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
      return res.json({ message: 'Authentication token required' })
    }
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.log(err)
        return res.json({ message: 'Invalid token' })
      }
      req.user = user;
      next()
    })
  }
  

Router.get('/',(req,res)=>{
    res.send("sending..")
})


Router.get('/dashboard',authenticateToken,(req,res) => {
    res.json({"message":"This is dashboard Page"})
})


Router.post('/login', async (req,res)=>{
    const {email,password} = req.body;
    try{
        const userEmail =  await userModel.find({email})
        if(userEmail.length===0){
           return res.json({"message":"user is not register"})
        }
        if (password === userEmail[0].password ){
            console.log(typeof(userEmail[0]))
            const token = jwt.sign({user:userEmail[0]},secretKey,{expiresIn:'1h'});
            res.json({"message":"succesfully login",token});
        }else{
            res.json({"message":"Password is wrong Not Logged In"})
        }
    }catch(error){
        console.log(error)
    }
})


export default Router