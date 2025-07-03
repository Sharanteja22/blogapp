const exp=require('express')
const authorApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const createUser=require('../middlewares/createUser')
const Article = require('../models/articleModel')
const {requireAuth}=require("@clerk/express")
require('dotenv').config()
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

authorApp.get("/articles",requireAuth({signInUrl:'unauthorized'}),expressAsyncHandler(async(req,res)=>{
    const allArticles=await Article.find({isArticleActive:true});
    res.status(200).send({message:"articles",payload:allArticles});
}))

authorApp.get('/unauthorized',(req,res)=>{
    res.status(401).send({message:"unauthorized please Login"});
})

//read only his articles

authorApp.get('/articles/:authorName',requireAuth({signInUrl:'unauthorized'}),expressAsyncHandler(async(req,res)=>{
    const authorName=req.params.authorName;
    const allArticles=await Article.find({"authorData.nameOfAuthor":authorName ,isArticleActive:true});
    res.status(200).send({message:"articles by author",payload:allArticles});
}))

//read deleted articles 
authorApp.get('/deletedArticles/:authorName',requireAuth({signInUrl:'unauthorized'}),expressAsyncHandler(async(req,res)=>{
    const authorName=req.params.authorName;
    const allArticles=await Article.find({"authorData.nameOfAuthor":authorName ,isArticleActive:false});
    res.status(200).send({message:"deleted articles by author",payload:allArticles});
}))

//edit an article
authorApp.put("/article/:articleId",requireAuth({signInUrl:'unauthorized'}),expressAsyncHandler(async(req,res)=>{
    const articleId=req.params.articleId;
    const updatedArticleObj=req.body; 
    const updatedArticle=await Article.findOneAndUpdate({articleId},{...updatedArticleObj},{new:true});
    res.status(200).send({message:"article updated",payload:updatedArticle});
}))

//soft delete and restore
authorApp.put("/articleDelete/:articleId",requireAuth({signInUrl:'unauthorized'}),expressAsyncHandler(async(req,res)=>{
    const articleId=req.params.articleId;
    const updatedArticleObj=req.body;
    const updatedArticle=await Article.findOneAndUpdate({articleId},{...updatedArticleObj},{new:true});
    if(updatedArticle.isArticleActive===true){
        res.status(200).send({message:"article restored",payload:updatedArticle});
    }else{
        res.status(200).send({message:"article deleted",payload:updatedArticle});
    }
}))

module.exports=authorApp;