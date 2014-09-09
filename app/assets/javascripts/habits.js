$(document).on('ready page:load', function() {
	addNewHabitForm();
	habitProgress();
	hideAddNewHabitForm();
	bindRadio();
	showMenu();
	editHabit();

	$('.habit-link').click(function(e) {
		e.preventDefault();
	});
});

var requestInProgress = false;
///////////////////////////////
// ADD NEW HABIT FORM STUFF  //
///////////////////////////////
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
	// AJAX response logic for create new habit request
	$('#habit-form').on('ajax:beforeSend', function(e, data, status, xhr) {
		$(this).find('input').removeClass('wrong-input');
	});
	$('#habit-form').on('ajax:success', function(e, data, status, xhr) {
		$('#overlay').click();
	});
	$('#habit-form').on('ajax:error', function(e, xhr, status, error) {
		var errors = xhr.responseJSON.errors;
		if (errors.title) {
			$('input#habit_title').attr('placeholder', 'Habit title can\'t be blank').addClass('wrong-input');
		}
		if (errors.goal) {
			$('input#habit_goal').attr('placeholder', 'Goal must be a number').addClass('wrong-input');
		}
	});
}

function hideAddNewHabitForm() {
	$('#overlay').click(function(e) {
		e.preventDefault();
		if (!requestInProgress) {
			$('.modal').animate({
				top: '0',
				opacity: 'hide'
			}, 'fast', function() {
				$('#overlay').hide();
			});
		}
	});

	$('#cancel-habit').click(function(e) {
		e.preventDefault();
		$('#overlay').click();
	});
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

////////////////////////////////////////////
// CLICK EVENTS TO UPDATE HABIT PROGRESS  //
////////////////////////////////////////////
function habitProgress() {
	$('.progress').click(progressAjaxRequest);
}
function progressAjaxRequest() {
	if (!requestInProgress) {
		requestInProgress = true;
		var path = $(this).closest('div.habit').find('.link').attr('href');
		var progress = $(this).parent().find('.done').length;
		if ( $(this).hasClass('done') ) {
			$.ajax({
			  type: "PUT",
			  url: path,
			  data: {habit: {done: progress-1} },
			  context: this,
			  beforeSend: function() {
			  	$(this).parent().children().addClass('animate-spin');
			  },
			  success: function() {
			  	$(this).parent().children().removeClass('animate-spin');
			  	$(this).parent().find('.done:last').removeClass('done');
			  	requestInProgress = false;
			  }
			});
		} else {
			$.ajax({
			  type: "PUT",
			  url: path,
			  data: {habit: {done: progress+1} },
			  context: this,
			  beforeSend: function() {
			  	$(this).parent().children().addClass('animate-spin');
			  },
			  success: function() {
			  	$(this).parent().children().removeClass('animate-spin');
			  	$(this).parent().find(':not(.done)').first().addClass('done');
			  	requestInProgress = false;
			  }
			});
		}
	}
}

/////////////////
// MENU BUTTON //
/////////////////
function showMenu() {
	$('#menu').click(function(e) {
		$('#overlay').show();
		$('#settings').animate({
			top: '30%',
			opacity: 'show'
		}, 'slow', 'easeOutBounce');
	});

	$('#settings-form').on('ajax:beforeSend', function(e, data, status, xhr) {
		$(this).find('input').removeClass('wrong-input');
	});
	$('#settings-form').on('ajax:error', function(e, xhr, status, error) {
		var errors = xhr.responseJSON.errors;
		if (errors.email) {
			$('input#user_email').attr('placeholder', 'Please enter correct email').addClass('wrong-input');
		}
		if (errors.password) {
			$('input#user_password').attr('placeholder', 'Please enter password').addClass('wrong-input');
		}
		if (errors.password_confirmation) {
			$('input#user_password_confirmation').attr('placeholder', 'Password should match').addClass('wrong-input');
	}
});
}

/////////////////////
// EDIT HABIT LINK //
/////////////////////
function editHabit() {
	$('.edit-habit-link').click(function(e) {
		e.preventDefault();
		if (!requestInProgress) {
			requestInProgress = true;
			$('#overlay').show();
			var link = $(this).attr('href');
			$('#habit-form form').attr('action', link);

			$.getJSON(link, function( data ) {
				var habit = data.habit;
				fillHabitForm(habit);
			})
			.done(function() {
				$('#habit-form').animate({
					top: '30%',
					opacity: 'show'
				}, 'slow', 'easeOutBounce');
				requestInProgress = false;
			})
		}
	});
}

function fillHabitForm(habit) {
	var kind = "#habit_kind_" + habit.kind;
	$(kind).attr('checked', true).change();
	$('#habit_title').val(habit.title);
	$('#habit_goal').val(habit.goal);
	$('#habit')
	// $('#habit_period').val(habit.period);
}















