$(function(){
	$(".has-tooltip").tooltip();
	$("#MULTI").click(function(event){
		console.log("got here");
		$(".radio").toggleClass("disabled");
	});
});