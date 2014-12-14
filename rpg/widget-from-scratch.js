var widget=(function( $ ) {
$( "#rangeinput" ).on( "change",function() {
  if($( "#newValue" ).val()>50) {
	  $( "#character-gender" ).val( "female" )
  }else if($( "#newValue" ).val()<50) {
	  $( "#character-gender" ).val( "male" )
  }else {
	  $( "#character-gender" ).val( "Select Gender" )
	}
  $("#character-gender").attr("value",$("#character-gender").val())
})
}( jQuery ))