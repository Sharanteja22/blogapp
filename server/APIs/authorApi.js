const exp=require('express')
const authorApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const createUser=require('../middlewares/createUser')


//create a new author
authorApp.post("/user",expressAsyncHandler(createUser))





module.exports=authorApp;