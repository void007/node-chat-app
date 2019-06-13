const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMsg,generateLocationMsg}=require('./utils/msg.js');
const {isRealString}=require('./utils/validation.js');
const {Users}=require('./utils/users.js');
const publicPath=path.join(__dirname, '../public');

// console.log(__dirname+'/../public');//
// console.log(publicPath);

const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
 var io=socketIO(server);
var users=new Users();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user Connected');

//socket.emit from admin text welcome to chat App
// socket.emit('newMsg',generateMsg('Admin','welcome to chat app'));//
//socket.broadcast.emit from admin text new user joined
// socket.broadcast.emit('newMsg',generateMsg('Admin','New user joined'));

socket.on('join', (params, callback) => {
  if (!isRealString(params.name) || !isRealString(params.room)) {
     return callback('Name and room name are required.');
  }

  socket.join(params.room);//join the room
  users.removeUser(socket.id);//remove from previously joined room
  users.addUser(socket.id,params.name,params.room);
  io.to(params.room).emit('updateUserList', users.getUserList(params.room));
  // socket.leave('The Office Fans');
  // io.emit -> io.to('The Office Fans').emit
  // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
  // socket.emit

  socket.emit('newMsg', generateMsg('Admin', 'Welcome to the chat app'));
  socket.broadcast.to(params.room).emit('newMsg', generateMsg('Admin', `${params.name} has joined.`));
  callback();
});




socket.on('createMsg',(msg,callback)=>{
  // console.log('CreateMsg',msg);
  var user=users.getUser(socket.id);
  if(user&&isRealString(msg.text)){
  io.to(user.room).emit('newMsg',generateMsg(user.name,msg.text));
}
  callback();
});

socket.on('createLocationMsg',(coords)=>{
  var user=users.getUser(socket.id);
  if(user){
  io.to(user.room).emit('newLocationMsg',generateLocationMsg(user.name,coords.latitude,coords.longitude));
}
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
  var user = users.removeUser(socket.id);

if (user) {
  io.to(user.room).emit('updateUserList', users.getUserList(user.room));
  io.to(user.room).emit('newMsg', generateMsg('Admin', `${user.name} has left.`));
}
});
});
// app.get('/server',(req,res)=>{
//   res.send("Hello this express!");
// });


server.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});
