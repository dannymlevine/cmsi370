$(window).load( function() { 
  $.getJSON("http://lmu-diabolical.appspot.com/characters",
    function (characters) {
	  characters.forEach(function (character) {
	    $("#lol").append("<li role=presentation><a id=\""+character.id+"\" class=\"character-button\" role=\"menuitem\"data-toggle=\"modal\" data-target=\"#character-view\" href=\"#character-view\">"+character.name+"</a></li>")});
	})			
})
$(document).on('click' , '.character-button' , function() {
  var idAttr = $(this).attr('id');
  console.log( 'using attr  = ' + idAttr);
  $.getJSON("http://lmu-diabolical.appspot.com/characters/"+idAttr ,
    function (character) {
      $("#character-view-id").val(idAttr)
      $("#character-view-name").val(character.name)
      $("#character-view-gender").val(character.gender)
      $("#character-view-class").val(character.classType)
      $("#character-view-level").val(character.level)
      $("#character-view-money").val(character.money)
    });
})
$("#modify").click(function() {
  $("#character-modify-id").val($("#character-view-id").val())
  $("#character-modify-name").val($("#character-view-name").val())
  $("#character-modify-gender").val($("#character-view-gender").val())
  $("#character-modify-class").val($("#character-view-class").val())
  $("#character-modify-level").val($("#character-view-level").val())
  $("#character-modify-money").val($("#character-view-money").val())
})
$("#submit").click(function() {
  $.ajax({
    type: 'PUT',
    url: "http://lmu-diabolical.appspot.com/characters/" + $("#character-modify-id").val(),
    data: JSON.stringify({
      id: $("#character-modify-id").val(),
      name: $("#character-modify-name").val(),
      classType: $("#character-modify-class").val(),
      gender: $("#character-modify-gender").val(),
      level: $("#character-modify-level").val(),
      money: $("#character-modify-money").val()
    }), contentType: "application/json",
    dataType: "json",
    accept: "application/json",
    success: function (data, textStatus, jqXHR) {
      location.reload();
      console.log("Done: no news is good news.");
    }});
})
$("#delete-confirm").click(function() {
  $.ajax({
    type: 'DELETE',
    url: "http://lmu-diabolical.appspot.com/characters/"+$("#character-view-id").val(),
    success: function (data, textStatus, jqXHR) {
      console.log("Gone baby gone.");
      location.reload();
    }});
})
$("#item").click(function() {
  $.getJSON("http://lmu-diabolical.appspot.com/items/spawn",
    {
      level: 50,
      slot: "body"
    } ,
    function (item) {
      console.log(item);
      $("#item-slot").val(item.slot)
      $("#item-name").val(item.name)
      $("#item-level").val(item.level)
    });
})
$("#create-character").click(function() {
  $.ajax({
	type: 'POST',
	url: "http://lmu-diabolical.appspot.com/characters",
	data: JSON.stringify({
	  name: $("#character-name").val(),
	  classType: $("#character-class").val(),
	  gender: $("#character-gender").val(),
	  level: $("#character-level").val(),
	  money: $("#character-money").val()
	}) ,
	contentType: "application/json" ,
	dataType: "json" ,
	accept: "application/json" ,
	complete: function (jqXHR, textStatus) {
	  // The new character can be accessed from the Location header.
	  console.log("You may access the new character at:" +
	  jqXHR.getResponseHeader("Location"));
	  //location.reload();
	}
  })
})
$(document).on("click","#home",function() {
	location.reload();
})
$(".has-tooltip").tooltip()




