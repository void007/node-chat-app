const path=require('path');
const express=require('express');
const publicPath=path.join(__dirname, '../public');

// console.log(__dirname+'/../public');//
// console.log(publicPath);
const port=process.env.PORT || 3000;
var app=express();

app.use(express.static(publicPath));

// app.get('/server',(req,res)=>{
//   res.send("Hello this express!");
// });


app.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});
