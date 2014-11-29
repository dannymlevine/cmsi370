
// JD: 11

$(window).load(function(){ // JD: 16


		$.getJSON( // JD: 7
		    "http://lmu-diabolical.appspot.com/characters",
		    function (characters) {
		        // Do something with the character list.
		        characters.forEach(function (character) {
		        	$("#lol").append("<li role=presentation><a id=\""+character.id+"\" class=\"characterButton\" role=\"menuitem\"data-toggle=\"modal\" data-target=\"#CharacterView\" href=\"#CharacterView\">"+character.name+"</a></li>")

// JD: 11

		        });
		    })			
		})


// JD: 11

$(document).on('click' , '.characterButton' , function(){ // JD: 16
    var idAttr = $(this).attr('id');
    console.log( 'using attr  = ' + idAttr);
    $.getJSON(
        // JD: 5
    "http://lmu-diabolical.appspot.com/characters/"+idAttr+"", // JD: 17
    function (character) {
        // JD: 18
    	$("#CharacterViewID").val(idAttr)
    	$("#CharacterViewName").val(character.name)
        $("#CharacterViewGender").val(character.gender)
        $("#CharacterViewClass").val(character.classType)
        $("#CharacterViewLevel").val(character.level)
        $("#CharacterViewMoney").val(character.money)
    }
);


}) // JD: 5 (oh so many 5's...)

// JD: 5
$("#modify").click(function(){ // JD: 16
    // JD: 18
	$("#CharacterModifyID").val($("#CharacterViewID").val())
	$("#CharacterModifyName").val($("#CharacterViewName").val())
    $("#CharacterModifyGender").val($("#CharacterViewGender").val())
    $("#CharacterModifyClass").val($("#CharacterViewClass").val())
    $("#CharacterModifyLevel").val($("#CharacterViewLevel").val())
    $("#CharacterModifyMoney").val($("#CharacterViewMoney").val())	
	
})

$("#submit").click(function(){ // JD: 16
	$.ajax({
    type: 'PUT',
    url: "http://lmu-diabolical.appspot.com/characters/"+$("#CharacterModifyID").val(), // JD: 16
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
    	location.reload(); // JD: 4
        console.log("Done: no news is good news.");
    }

});

})

// JD: 11

$("#deleteConfirm").click(function(){ // JD: 16
	$.ajax({ // JD: 7
        // JD: 5
    type: 'DELETE',
    url: "http://lmu-diabolical.appspot.com/characters/"+$("#CharacterViewID").val(),
    success: function (data, textStatus, jqXHR) {
        console.log("Gone baby gone.");
        location.reload(); // JD: 4
    }
}); // JD: 5
})

$("#Item").click(function(){ // JD: 13 (#item), 16
	$.getJSON( // JD: 7
        // JD: 5
    "http://lmu-diabolical.appspot.com/items/spawn",
    {
        level: 50,
        slot: "body"
    },
    function (item) {
        console.log(item);
        $("#itemSlot").val(item.slot)
        $("#itemName").val(item.name)
        $("#itemLevel").val(item.level)
    });

})
 

// JD: 11


$(function(){ // JD: 19, 16
	$("#createCharacter").click(function(){ // JD: 16
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
		        location.reload(); // JD: 4

		    }
		})

// JD: 11


	})

})
	
// JD: 11

$(document).on("click","#home",function(){ // JD: 16
	location.reload();
})
$(function(){$(".has-tooltip").tooltip();}) // JD: 19, 16


