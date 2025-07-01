const exp=require('express')
const authorApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const createUser=require('../middlewares/createUser')
const Article = require('../models/articleModel')


//create a new author
authorApp.post("/user",expressAsyncHandler(createUser))


//create a new article

authorApp.post("/article",expressAsyncHandler(async(req,res)=>{
    
    const newArticleObj=req.body;
    const newArticle=new Article(newArticleObj);
    const newArticleDoc=await newArticle.save();
    res.status(201).send({message:"article created",payload:newArticleDoc});
}))

//read all articles

authorApp.get("/articles",expressAsyncHandler(async(req,res)=>{
    const allArticles=await Article.find({});
    res.status(200).send({message:"all articles",payload:allArticles});
}))

module.exports=authorApp;