const exp=require('express')
const app=exp()
const mongoose=require('mongoose')

require('dotenv').config()
const port=process.env.PORT || 4000

mongoose.connect(process.env.DB_URL)
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })
    console.log('DB is connected');
})
.catch((err)=>{
    console.log("error in database  connection: ",err);
})


app.use('/user-api',require('./APIs/userApi'))
app.use('/author-api',require('./APIs/authorApi'))
app.use('/admin-api',require('./APIs/adminApi'))