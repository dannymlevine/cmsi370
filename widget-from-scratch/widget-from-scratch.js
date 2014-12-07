(function($){

	console.log($("#rangeinput").attr("onchange"))


$("#rangeinput").on("change",function(){
	if($("#newValue").val()>50){
		$("#gender").val("female")
	}else if($("#newValue").val()<50){
		$("#gender").val("male")
	}else{
		$("#gender").val("Select Gender")
	}
})
}(jQuery))