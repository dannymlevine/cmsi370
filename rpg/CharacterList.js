
$(window).load(function(){


		$.getJSON(
		    "http://lmu-diabolical.appspot.com/characters",
		    function (characters) {
		        // Do something with the character list.
		        characters.forEach(function (character) {
		        	$("#lol").append("<li><a role=\"menuitem\">"+character.name+"</a></li>")
		        });
		    })
	
})
