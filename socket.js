
const fs            = require('fs');
const path          = require('path');

exports.readStream  = readStream;

function readStream(req, res){
    io.on('connection',(socket)=>{
        let readStream = fs.createReadStream(path.resolve(__dirname,'./ap.jpg'),{
            encoding: 'binary'
        });
        readStream.on('readable',()=>{
            console.log('reading....');
        });
        let id =0;
         readStream.on('data',(chunk)=>{
            console.log('image read');            
            // dataTransfer.push(chunk);
            socket.emit('img-chunk',{data:chunk,id:id});
            id++;
        });
        readStream.on('end',()=>{
            console.log("image loaded");
            socket.emit('img-finishes',id);
        })
        return 
    })
}