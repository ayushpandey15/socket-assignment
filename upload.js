const socket   = io.connect();
var tmp = [];
socket.on('img-chunk',(chunk)=>{
  
   // var imgChunk;
   //var img=document.getElementById('output'); 
   
   //console.log('the chunk is...',chunk)
  tmp.push(chunk);
  // for(i=0;i<tmp.length;i++) {
  //   //console.log("the temp is..",tmp[i], tmp[i].id);
  //   if(tmp[i].id==i){
  //     data.push(tmp[i].data)
  //   }
  // }
  // console.log("the data is...",data);
  // img.setAttribute('src','data:image/jpeg;base64,'+window.btoa(data));;
  
  
})
socket.on('img-finishes',(length)=>{
  console.log("the lengt is ...",length,tmp.length);
  let data=[];
  let img = document.getElementById('output');
  for(i=0;i<length;i++){   
    for(j=0;j<tmp.length;j++){      
      if(tmp[j].id==i){
        console.log("the data is",tmp[j].id);
        data.push(tmp[j].data);
       // tmp.pop(tmp[j])
      } 
    }     
  }
  img.setAttribute('src','data:image/jpeg;base64,'+window.btoa(data));
 })