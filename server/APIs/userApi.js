const exp=require('express')
const userApp=exp.Router()
const User=require('../models/userModel')

userApp.get("/users",async(req,res)=>{
    let users=await  User.find()
    res.send({message:"users",data:users})
})





module.exports=userApp;