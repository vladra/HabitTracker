$(document).on('ready page:load', function() {
	addNewHabit();
	hideButton();
	bindRadio();
});

function addNewHabit() {
	$('.good-button').click(function(e) {
		e.preventDefault();
		$('#habit-form-container').show();
		$('#habit_kind_good').attr('checked', true);
		$('#habit-form').animate({
			top: '30%',
			opacity: 'show'
		}, 'slow', 'easeOutBounce');
	});
	$('.bad-button').click(function(e) {
		e.preventDefault();
		$('#habit-form-container').show();
		$('#habit_kind_bad').attr('checked', true);
		$('#habit-form').animate({
			top: '30%',
			opacity: 'show'
		}, 'slow', 'easeOutBounce');
	});
}

function hideButton() {
	$('#habit-form-container').click(function(e) {
		e.preventDefault();
		$('#habit-form').animate({
			top: '0',
			opacity: 'hide'
		}, 'fast', function() {
			$('#habit-form-container').hide();
		});
	})
}

function bindRadio() {
	$('input:radio[name="habit[kind]"]').change(function() {
		if ( $(this).val() === 'good' ) {
			$('#habit-form').css('border', '1px solid #C7F464');
		} else if ($(this).val() === 'bad') {

		}
	})
}
