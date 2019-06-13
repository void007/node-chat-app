var socket=io();

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#msgs');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}


socket.on('connect',function(){
  console.log('Connected to server');

  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });

});

socket.on('disconnect',function(){
  console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMsg',function(msg){
  // console.log('newMsg',msg);
  var formattedTime=moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
var html = Mustache.render(template, {
  text: msg.text,
  from: msg.from,
  createdAt: formattedTime
});

jQuery('#msgs').append(html);
scrollToBottom();
  // var li=jQuery('<li></li>');
  // li.text(`${msg.from} ${formattedTime}:${msg.text}`);
  // jQuery('#msgs').append(li);
});

socket.on('newLocationMsg',function(msg){
  var formattedTime=moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    url: msg.url,
    createdAt: formattedTime
  });

  jQuery('#msgs').append(html);
  scrollToBottom();



  // var li=jQuery('<li></li>');
  // var a=jQuery('<a target="_blank">My Current Location</a>');
  // var formattedTime=moment(msg.createdAt).format('h:mm a');
  // li.text(`${msg.from} ${formattedTime}: `);
  // a.attr('href',msg.url);
  // li.append(a);
  // jQuery('#msgs').append(li);
});
// socket.emit('createMsg',{
//   from:'Mandeep',
//   text:'Hey',
// },function(data){
//   console.log('Got it',data);
// });

jQuery('#msg-form').on('submit',function(e){
  e.preventDefault();
  var messageTextbox=jQuery('[name=msg]');
   socket.emit('createMsg',{
     // from:'User',
     text:messageTextbox.val()
   },function(){
     messageTextbox.val('')
   });
});

var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('geolocation not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    // console.log(position);
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMsg',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});





// socket.on('newEmail',function(email){
//   console.log('New email',email);
//});
