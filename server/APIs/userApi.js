const exp=require('express')
const userApp=exp.Router()
const User=require('../models/userModel')
const expressAsyncHandler=require('express-async-handler')
const createUser=require('../middlewares/createUser')
//create a new user
userApp.post("/user",expressAsyncHandler(createUser))





module.exports=userApp;