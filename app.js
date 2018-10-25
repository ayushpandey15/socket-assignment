const express       = require('express');
const socket        = require('socket.io');
let uplaod          = require('./socket');
let http            = require('http');
const fs            = require('fs');
const path          = require('path');

const app = express();

let server;

const PORT = process.env.PORT || 8000;
server = http.Server(app);
server.listen(PORT,()=>{
    console.log(`the server is listen on port ${PORT}`);
})
let io = socket(server);
app.use(express.static(__dirname));
// app.get('/upload',uplaod.readStream);


io.on('connection',(socket)=>{    
let  readStream = fs.createReadStream(path.resolve(__dirname,'./ap.jpg'),{
    encoding : 'binary'
});
let dataTransfer =[];
readStream.on('readable',()=>{
    console.log('reading....');
});
var id=0;
readStream.on('data',(chunk)=>{
    console.log('image read');
    
    // dataTransfer.push(chunk);
    socket.emit('img-chunk',{data:chunk,id:id});
    dataTransfer.push(chunk)
    id++;
});

readStream.on('end',()=>{
    console.log("image loaded");
    socket.emit('img-finishes',id);    
})
})