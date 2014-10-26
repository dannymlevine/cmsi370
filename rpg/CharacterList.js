
$(window).load(function(){


		$.getJSON(
		    "http://lmu-diabolical.appspot.com/characters",
		    function (characters) {
		        // Do something with the character list.
		        characters.forEach(function (character) {
		        	$("#lol").append("<li role=presentation><a role=\"menuitem\"data-toggle=\"modal\" data-target=\"#CharacterView\" href=\"#CharacterView\">"+character.name+"</a></li>")

		        });
		    })			
		})
	

