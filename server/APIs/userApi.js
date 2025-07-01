const exp=require('express')
const userApp=exp.Router()
const User=require('../models/userModel')
const expressAsyncHandler=require('express-async-handler')
const createUser=require('../middlewares/createUser')
const Article = require('../models/articleModel')
//create a new user
userApp.post("/user",expressAsyncHandler(createUser))

//add comment

userApp.put('/comment/:articleID',expressAsyncHandler(async(req,res)=>{
    const commentObj=req.body;
    const modifiedArticle=await Article.findOneAndUpdate({articleId:req.params.articleID},{$push:{comments:commentObj}},{new:true});
    res.status(200).send({message:"comment added",payload:modifiedArticle});
}))



module.exports=userApp;