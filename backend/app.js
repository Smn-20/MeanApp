const path=require("path");
const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();
const postsRoutes=require('./routes/posts');
const userRoutes=require('./routes/auth');

//Connect our database
mongoose.connect(config.database)
.then(()=>{
console.log("Connected to database!!");
}).catch(()=>{
  console.log("Connection failed!");
});




app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, PATCH, PUT, DELETE, OPTIONS")
  next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join(__dirname,"images")));
app.use("/",express.static(path.join(__dirname,"angular")));
app.use('/api/posts',postsRoutes);
app.use('/api/auth',userRoutes);
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,'angular','index.html'));
})

module.exports=app;
