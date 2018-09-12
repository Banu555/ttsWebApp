const express = require("express");
const app = express();

const path = require('path')
const gTTS = require('gtts');
const bodyParser = require('body-parser')
const port = 8080;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//to serve static files
app.use(express.static('public'))

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname+'/index.html'))
})
app.post('/getAudio',(req,res)=>{
	var gtts = new gTTS(req.body.input, 'en');
	var now = new Date();
	var time = now.getTime();
	gtts.save(__dirname+"/public/tmpAudio/"+time.toString()+".mp3", function (err, result) {
	  if(err) { 
	  	res.send("error") 
	  	console.log(err);
	  }else{
		  res.send("success"+time.toString());
	  }
	});
})

app.listen(port,(err)=>{
	if(err){
		return console.log("Something bad happen",err)
	}
	console.log(`server is listening on ${port}`)
})