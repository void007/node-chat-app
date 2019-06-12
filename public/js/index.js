var socket=io();
socket.on('connect',function(){
  console.log('Connected to server');



  // socket.emit('createMsg',{
  //   from:'mandeep@',
  //   text:'yeah,thank you'
  // });

  // socket.emit('createEmail',{
  //   to:'xyz@',
  //   text:'hey'
  // });

});

socket.on('disconnect',function(){
  console.log('disconnected from server');
});

socket.on('newMsg',function(msg){
  console.log('newMsg',msg);
});



// socket.on('newEmail',function(email){
//   console.log('New email',email);
//});
