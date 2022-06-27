const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const url='mongodb://localhost:27017/userDB';
const app=express();
const port=9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to mongodb
mongoose.connect(url,{useNewUrlParser:true});
const con=mongoose.connection;

con.on('open',()=>{
    console.log("connected.");
});

const userRouter=require('./routes/users');
const { response } = require('express');
app.use('/users',userRouter);

app.get('/',(req,res)=>{
    const data=req.body;
    console.log(req);
    res.json(data);
})
app.listen(9000,()=>{
    console.log("server listening on port "+port);
});