$(document).on('ready page:load', function() {
	addNewHabitForm();
	hideAddNewHabitForm();
	bindRadio();
});

function addNewHabitForm() {
	$('.good-button').click(function(e) {
		e.preventDefault();
		$('#habit_kind_good').attr('checked', true).change();
		$('#overlay').show();
		$('#habit-form').animate({
			top: '30%',
			opacity: 'show'
		}, 'slow', 'easeOutBounce');
	});
	$('.bad-button').click(function(e) {
		e.preventDefault();
		$('#habit_kind_bad').attr('checked', true).change();
		$('#overlay').show();
		$('#habit-form').animate({
			top: '30%',
			opacity: 'show'
		}, 'slow', 'easeOutBounce');
	});
	$('#cancel-habit').click(function(e) {
		e.preventDefault();
		$('#overlay').click();
	});
	// AJAX logic for add new habit form
	$('#habit-form').on('ajax:success', function(e, data, status, xhr) {
		$('#overlay').click();
	});
}

function hideAddNewHabitForm() {
	$('#overlay').click(function(e) {
		e.preventDefault();
		$('#habit-form').animate({
			top: '0',
			opacity: 'hide'
		}, 'fast', function() {
			$('#overlay').hide();
		});
	})
}

function bindRadio() {
	$('input:radio[name="habit[kind]"]').change(function() {
		if ( $(this).val() === 'good' ) {
			$('#habit-form').css('border', '1px solid #C7F464');
		} else if ( $(this).val() === 'bad' ) {
			$('#habit-form').css('border', '1px solid #FF6B6B');
		}
	})
}
