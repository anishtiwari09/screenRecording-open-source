import React, { useEffect, useRef, useState } from "react";
import getBlobDuration from 'get-blob-duration'
import {Buffer} from 'buffer';
import html2canvas from "html2canvas";
import { webmFixDuration } from 'webm-fix-duration';
window.Buffer = Buffer;

// console.log('ts-ebml')
let recorder=''
let ebml=require('ts-ebml')
let chunk2=[]
let finalDuration=0
let {Decoder}=ebml
let {Encoder}= ebml
let {Reader}= ebml
let {tools}= ebml


  let decoder=new Decoder()
  
  let encoder=new Encoder()
  let reader=new Reader()
  console.log(reader,'reader')
// console.log(reader)
let newBlob=[]
async function blobDuration(blob) {
    console.log('getting duration...')
  const duration = await getBlobDuration(blob)
  console.log(duration + ' secondsdd')
  return duration
}
let i=1;
function decodedCallback (chunk) {
  console.log(chunk)
  if (chunk[0] === 'tag') {
    const name = chunk[1].name
    const value = chunk[1].value
   /* something useful */
  }
}
export default function VideoRecording() {
  async function recordScreen() {
    return await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: { mediaSource: "screen" }
    });
  }
  async function blobTobase64(blob){
    var reader = new FileReader();
    console.log(blob,'74')
    let blob2
    reader.readAsDataURL(blob);
    let base64String2=""
    reader.onloadend = async function () {
      var base64String = reader.result;
      base64String2=base64String
      
      // base64String=base64String.substr(base64String.indexOf(', ') + 1);
      blob=await fetch(base64String).then(res=>res.blob())
      console.log(blob)
      blob=await findMetaData(blob,60000)
      recordedChunks[0]=blob


      // Simply Print the Base64 Encoded String,
      // without additional data: Attributes.
    //   console.log('Base64 String without Tags- ', 
    //  base64String.substr(base64String.indexOf(', ') + 1));
          }
    
  //   const fs = require('fs')
  //   fs.writeFile('E:/begalileoNew/fixingIssues/beGalileo-Live-class-/public/output.txt', blob, (err) => {
  //       console.log('writeing')
  //     // In case of a error throw err.
  //     console.log(err,'err')
  //     if (err) throw err;
  // })
  
  
  }
  async function recordAudio(){
    return await navigator.mediaDevices.getUserMedia({
      video:{ mediaSource: "screen" },
      audio:true
    })
  }
  let recordedChunks = [];
 async function createRecorder(stream, mimeType) {
    const webm2mp4 = require('webm2mp4-js')
    console.log(webm2mp4)
    const wantMimeType = "video/webm"
    const mediaRecorder = new MediaRecorder(stream,{
      mimeType:wantMimeType
    });

console.log(MediaRecorder.isTypeSupported(wantMimeType)) 
 
    mediaRecorder.ondataavailable = async function (ev) {
      // console.log(decoder)

      let payloadBlob = ev.data
      chunk2.push(payloadBlob)
      if(recordedChunks.length>1)
      recordedChunks.pop()
      recordedChunks.push(payloadBlob)
      finalDuration= await blobDuration(new Blob(recordedChunks,{mimeType:'video/x-matroska;codecs=avc1'}))
      
  //    if(recordedChunks?.length===0)
  //    payloadBlob=await webmFixDuration(payloadBlob,120*1000)
  //  console.log('payload',recordedChunks.length,payloadBlob)
  //    recordedChunks.push(payloadBlob)
   

      
// if(i==1)
// {
//   console.log(i,'if')
//   console.log(e)
//   let duration=await findMetaData(e.data,600)
// recordedChunks.push(duration)

  
// }
// else
// {
//   console.log(i,'else')
// let duration=await findMetaData(e.data,0.001)
// recordedChunks.push(duration)

// }

//   i++      
        
      
    };
    mediaRecorder.onstop = async function (e) {
      console.log(e)
    
      saveFile(recordedChunks)
    };
    mediaRecorder.start(60*1000);
    return mediaRecorder;
  }
let handleStop=async ()=>{
  
recorder.stop()
}

let handleStop2=()=>{
  html2canvas(document.getElementById('root')).then((canvas) => {
    let a = document.createElement("a");
    a.download = "ss.png";
    let c= canvas.toBlob((res)=>recordedChunks.push(res))
  console.log(c)
  });
// recorder.stop()
}
 async  function saveFile(recordedChunks) {
    // blobDuration(videoSrc)
    
   await findMetaData(recordedChunks[0],finalDuration)
   chunk2[0]=newBlob
   const blob = new Blob(chunk2, {
    type: "video/x-matroska;codecs=avc1"
  });
   let videoSrc = URL.createObjectURL(blob);
   console.log(videoSrc)
  
  }
  const startRecording2 = async () => {try{
    let stream = await recordScreen();
    // let stream = await recordAudio();
    console.log(stream)
    let mimeType = "video/webm";
    let mediaRecorder =await createRecorder(stream, mimeType);
    recorder=mediaRecorder
    console.log(mediaRecorder,'medial','ddddkdkkdkdkdkdkdkdkdkkd')}
    catch(e){
      console.log(e,'ee')
    }
  };
  const handleChange=async (e)=>{
// console.log(ref.current.files[0])
let videoSrc = URL.createObjectURL(ref.current.files[0]);
videoSrc="https://begalileo-liveclass-recordings.s3.ap-south-1.amazonaws.com/live-class-recordings/2022-09-18/119365_2022918_1663440985.webm"
console.log('fetching start')
// await convertWebmToMp42(videoSrc)
// let blob2 = await fetch(videoSrc).then(r => r.blob());
console.log('fetching complete')
// mergeVideoDuration(blob2)
let duration=await blobDuration(videoSrc)
console.log('awaiting complete')

// let results =await findMetaData(blob2,duration*1000)
// let results=await mergeVideoDuration(blob2,duration)
// console.log(results)
// let results=await webmFixDuration(blob2,duration*1000)
// console.log(results)
// videoSrc = URL.createObjectURL(results);
// console.log(videoSrc)
  }
  const ref=useRef()
  useEffect(()=>{
    // testData()
  },[])

  let findMetaData=async (data,duration)=>{

    let decoder=new Decoder()
    let encoder=new Encoder()
    let reader=new Reader()
  
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
        var ebmlElms = decoder.decode(this.result);
        ebmlElms.forEach(function(element) {
            reader.read(element);
        });
        reader.stop();
        var refinedMetadataBuf = tools.makeMetadataSeekable(reader.metadatas, duration*1000, reader.cues);
        var body = this.result.slice(reader.metadataSize);
       newBlob = new Blob([refinedMetadataBuf, body], {
            type: 'video/webm'
        });

       console.log(reader.duration)
    };

    fileReader.readAsArrayBuffer(data);

// console.log(data) 
// let buff=await data.arrayBuffer()
// let videoSrc = URL.createObjectURL(data);

// // console.log(duration)
// // console.log(buff)
//   const ebmlElms = decoder.decode(buff);

//   // let decodeFile=encoder.encode(ebmlElms)
//   ebmlElms.forEach((item)=>{
//     reader.read(item)
//   })
//    reader.stop()
//   // console.log(reader)
 
//   console.log(reader.duration,'duration')
//   return

//   let refinedMetadataBuf = tools.makeMetadataSeekable(reader.metadatas, duration, reader.cues);
//     // console.log(refinedMetadataBuf)
  
//     let body =buff.slice(reader.metadataSize);
//     let result = new Blob([refinedMetadataBuf, body],
//       {type: data.type})
      
//       // console.log(result)
//       return result
//     // blobDuration(videoSrc)
//     videoSrc = URL.createObjectURL(result);
//     console.log(videoSrc)
//     // console.log(videoSrc);
//   // console.log(ebmlElms)
//   // console.log(encoder.encode())
  
//   // saveFile(ebmlElms)
//   // let filename = window.prompt('Enter file name')
//   let downloadLink = document.createElement('a');
//   // videoSrc = await URL.createObjectURL(result);
//   downloadLink.href =videoSrc
//   downloadLink.download = `${Date.now()}.webm`;
//   // downloadLink.click();



  }
  
  const [outUrl, setOutUrl] = useState("");

  const [step, setStep] = useState("ready");
  const mergeVideoDuration=async(blob,duration)=>{
    console.log(blob)
    
    let ysFixWebmDuration=require('fix-webm-duration')
    // console.log(ysFixWebmDuration)
   
    // let duration=await blobDuration(videoSrc)
    // console.log(duration)
    let y=await ysFixWebmDuration(blob, duration*1000,function(fixedBlob) {
      console.log(fixedBlob)
      let videoSrc=URL.createObjectURL(fixedBlob)
      console.log(videoSrc)
  }); 
//  console.log(y)
  // let videoSrc=URL.createObjectURL(y)
  // console.log(videoSrc)
  }

  const testData=async ()=>{
    console.log('fetching')
let blob=await fetch('https://begalileo-liveclass-recordings.s3.ap-south-1.amazonaws.com/live-class-recordings/2022-07-27/106558_2022727_1658910012.webm').then(res=>res.blob())
console.log('not fetching')
localStorage.setItem('datas',JSON.stringify(blob))
console.log(blob)
  }
  let [count,setCount]=useState(0)
 let [arr,setarr]=useState(new Array(count))
 let idRef=useRef()
  useEffect(()=>{
idRef.current=setInterval(()=>{
setCount(prev=>{
 
 return prev+1
})

},3000)
  },[])
 
  return (
    <div id="kdkdkdk" style={{background:"yellow",height:"100vh"}}>
      <button onClick={startRecording2}>Start</button>
      <input type="file" ref={ref} onChange={handleChange}/>
      <button onClick={handleStop}>Stop</button>
<h1>{count}</h1>
    </div>
  );
}
