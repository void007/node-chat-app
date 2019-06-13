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

socket.on('newLocationMsg',function(msg){
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${msg.from}: `);
  a.attr('href',msg.url);
  li.append(a);
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

var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    // console.log(position);
    socket.emit('createLocationMsg',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    alert('Unable to fetch location');
  });
});





// socket.on('newEmail',function(email){
//   console.log('New email',email);
//});