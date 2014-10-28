


$(window).load(function(){
		var characterArray=[]

		$.getJSON(
		    "http://lmu-diabolical.appspot.com/characters",
		    function (characters) {
		        // Do something with the character list.
		        characters.forEach(function (character) {
		        	$("#lol").append("<li role=presentation><a id=\""+character.id+"\" class=\"characterButton\" role=\"menuitem\"data-toggle=\"modal\" data-target=\"#CharacterView\" href=\"#CharacterView\">"+character.name+"</a></li>")



		        });
		    })			
		})




$(document).on('click' , '.characterButton' , function(){ 
    var idAttr = $(this).attr('id');
    console.log( 'using attr  = ' + idAttr);
    $.getJSON(
    "http://lmu-diabolical.appspot.com/characters/"+idAttr+"",
    function (character) {
    	$("#CharacterViewID").val(idAttr)
    	$("#CharacterViewName").val(character.name)
        $("#CharacterViewGender").val(character.gender)
        $("#CharacterViewClass").val(character.classType)
        $("#CharacterViewLevel").val(character.level)
        $("#CharacterViewMoney").val(character.money)
    }
);


})

$("#modify").click(function(){
	$("#CharacterModifyID").val($("#CharacterViewID").val())
	$("#CharacterModifyName").val($("#CharacterViewName").val())
    $("#CharacterModifyGender").val($("#CharacterViewGender").val())
    $("#CharacterModifyClass").val($("#CharacterViewClass").val())
    $("#CharacterModifyLevel").val($("#CharacterViewLevel").val())
    $("#CharacterModifyMoney").val($("#CharacterViewMoney").val())	
	
})

$("#submit").click(function(){
	$.ajax({
    type: 'PUT',
    url: "http://lmu-diabolical.appspot.com/characters/"+$("#CharacterModifyID").val(),
    data: JSON.stringify({
        id:$("#CharacterModifyID").val() ,
        name: $("#CharacterModifyName").val(),
        classType: $("#CharacterModifyClass").val(),
        gender: $("#CharacterModifyGender").val(),
        level: $("#CharacterModifyLevel").val(),
        money: $("#CharacterModifyMoney").val()
    }),
    contentType: "application/json",
    dataType: "json",
    accept: "application/json",
    success: function (data, textStatus, jqXHR) {
        console.log("Done: no news is good news.");
    }
});

})



 




$(function(){
	$("#createCharacter").click(function(){
		$.ajax({
		    type: 'POST',
		    url: "http://lmu-diabolical.appspot.com/characters",
		    data: JSON.stringify({
		        name: $("#characterName").val(),
		        classType: $("#characterClass").val(),
		        gender: $("#selector").val(),
		        level: $("#characterLevel").val(),
		        money: $("#characterMoney").val()
		    }),
		    contentType: "application/json",
		    dataType: "json",
		    accept: "application/json",
		    complete: function (jqXHR, textStatus) {
		        // The new character can be accessed from the Location header.
		        console.log("You may access the new character at:" +
		            jqXHR.getResponseHeader("Location"));

		    }
		})




	})

})
	





