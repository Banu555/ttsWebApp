var audio = document.getElementById("audioControls");

var previousTxt="";

function playOrPause(){
	var inputTxt = $("#inputTxt").val().trim();

	if(inputTxt != ""){
		if(previousTxt == ""){
			previousTxt = inputTxt;
			audioGenerate(inputTxt)
		}
		else if(previousTxt === inputTxt){
			if(document.getElementById("audioControls").hasAttribute("src")){
				//toogle the action
				if(audio.paused || audio.ended){
					$("#speak_button_new").removeClass("glyphicon-play")
					$("#speak_button_new").addClass("glyphicon-pause")
					audio.play();	 	
		 		}
			 	else{
				 	$("#speak_button_new").removeClass("glyphicon-pause")
					$("#speak_button_new").addClass("glyphicon-play")
					audio.pause();
		 		}
			}
			else{
				//call the audio generating function
				previousTxt = inputTxt;
				audioGenerate(inputTxt)
			}
		}
		else{
			previousTxt = inputTxt;
			audioGenerate(inputTxt)
		}//else ended
	}
	else{
		$("#audioControls").removeAttr("src");
		alert("Please write something to read.")
	}
}//palyOrPause ended

function audioGenerate(inputTxt){
	var txtJson = {"input":inputTxt}
	$.post('/getAudio',txtJson,(data,err)=>{
		if (data.indexOf("success") != -1) {
			var fileName = data.replace("success","");
			audio.src ="/tmpAudio/"+fileName+".mp3"
			//change the play icon to pause
			$("#speak_button_new").removeClass("glyphicon-play")
 			$("#speak_button_new").addClass("glyphicon-pause")
			audio.load();
			audio.play();
		}
		else{
			alert("Something bad happen, please try after sometime.")
		}
	})//post ended
}

//Set icons to initial sate if audio ended
audio.onended = function() {
	$("#audioControls").removeAttr("src");
	$("#speak_button_new").removeClass("glyphicon-pause")
	$("#speak_button_new").addClass("glyphicon-play")
};

