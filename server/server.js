const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath=path.join(__dirname, '../public');

// console.log(__dirname+'/../public');//
// console.log(publicPath);
const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
 var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user Connected');

//socket.emit from admin text welcome to chat App
socket.emit('newMsg',{
  from:'Admin',
  text:'Welcome to chat app',
  createdAt:new Date().getTime()
});
//socket.broadcast.emit from admin text new user joined
socket.broadcast.emit('newMsg',{
  from:'Admin',
  text:'New user joined',
  createdAt:new Date().getTime()
});

socket.on('createMsg',(msg)=>{
  console.log('CreateMsg',msg);
  io.emit('newMsg',{
    from:msg.from,
    text:msg.text,
    createdAt:new Date().getTime()
  });
});


// socket.emit('newMsg',{
//   from:'admin@',
//   text:'you doing alright',
//   createdAt:123
// });

// Email
// socket.emit('newEmail',{
//   from:'mandeep@',
//   text:'hey,how you doing',
//   createAt:111
// });
// socket.on('createEmail',(newEmail)=>{
//   console.log('createEmail',newEmail);
// });



socket.on('disconnect',()=>{
  console.log('User disconnected');
});
});
// app.get('/server',(req,res)=>{
//   res.send("Hello this express!");
// });


server.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});
