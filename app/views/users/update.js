$('#settings h3').after('<p class="center success">Profile updated successfuly!</p>');
setTimeout(function() {
	$('#settings .success').remove();
	$('#overlay').click();
}, 3000);
