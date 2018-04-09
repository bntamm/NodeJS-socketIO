var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

console.log("Server running");



var arrayUser = [];


var tontai = true; 

io.sockets.on('connection', function (socket) {
	
  console.log("co thiet bi vua connect");
  
  
  
  socket.on('client-register-user', function (data) {

  	
  	if(arrayUser.indexOf(data) == -1){ 
  	
  		arrayUser.push(data);
  		tontai = false;
  		console.log("Đki' thanh cong : " +data);

  		
  		socket.un = data;	

  		
		io.sockets.emit('server-send-user', {danhsach: arrayUser });

		
	socket.emit('server-send-result', { ketqua: tontai });
  	}else{
  		console.log("User " +data+ " da ton tai");
  		tontai = true;
  	}

  });




  socket.on('client-send-chat', function (noiDung) {
  		console.log(socket.un +" : "+noiDung); 
  		
	io.sockets.emit('server-send-chat', {chatContent: 
	socket.un +" : "+noiDung });
	
  });

  
});