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
  var li=jQuery('<li></li>');
  li.text(`${msg.from}:${msg.text}`);
  jQuery('#msgs').append(li);
});

// socket.emit('createMsg',{
//   from:'Mandeep',
//   text:'Hey',
// },function(data){
//   console.log('Got it',data);
// });

jQuery('#msg-form').on('submit',function(e){
  e.preventDefault();

   socket.emit('createMsg',{
     from:'User',
     text:jQuery('[name=msg]').val()
   },function(){

   });
});


// socket.on('newEmail',function(email){
//   console.log('New email',email);
//});
