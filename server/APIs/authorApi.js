const exp=require('express')
const authorApp=exp.Router()


authorApp.get("/",(req,res)=>{
    res.send("author api")
})







module.exports=authorApp;