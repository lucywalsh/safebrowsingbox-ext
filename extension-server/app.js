var express = require('express');
var app = express();

//create Socket server for communication with browser extension
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);

const { Board, Led } = require("johnny-five");
var board = new Board();

board.on("ready", function() {
  console.log("Board ready");

// define components
var led = new Led.RGB({
    pins: {
      red: 13,
      green: 12,
      blue: 11
    }
  });
var piezo = new Piezo(9);
var servo = new Servo(8);

/* Listen for socket connection on port 3002 */
socketServer.listen(3002, function(){
console.log('Socket server listening on : 3002');
});

/* This event will emit when client connects to the socket server */
io.on('connection', function(socket){
  console.log("Socket connection established");

  // if LED message recieved, flash LED in user's chosen colour
  socket.on('LED',function(data){
    console.log(data);

    //switch LED on
    led.on();
    //colour recieved is HEX code to set LED to
    var color = data;
    led.color(color);
    //flash LED
    led.blink(1000);
    led.off();

  });

  // if Sound message recieved, buzz the piezo speaker in the uer's chosen note
  socket.on('Sound',function(data){
    console.log(data);
    //note recieved is the frequency to play at
    var note=data;
    piezo.frequency(note, 500);
    wait(500);
  });

  // if Movement message recieved, sweep the Servo in the direction the user chose
  socket.on('Movement',function(data){
    console.log(data);
    // data recieved is either Left or right - sweep Servo in given direction
    if(data=="Left"){
      servo.sweep();
    }
    if(data=="Right"){
      servo.sweep();
    }
  });
  // when server disconnects, turn off components
  socket.on('disconnect', function() {
    console.log('Got disconnect!');
    led.off();
    servo.home();
    piezo.off();
  });
});
});

/* Create HTTP server for node application */
var server = require('http').createServer(app);

/* Node application will be running on 3000 port */
server.listen(3000);
