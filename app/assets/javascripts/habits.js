$(document).on('ready page:load', function() {
	addNewHabitForm();
	habitProgress();
	hideAddNewHabitForm();
	bindRadio();
});

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
	$('#cancel-habit').click(function(e) {
		e.preventDefault();
		$('#overlay').click();
	});
	// hide form on ajax:success
	$('#habit-form').on('ajax:success', function(e, data, status, xhr) {
		$('#overlay').click();
	});
	$('#habit-form').on('ajax:error', function(e, xhr, status, error) {
		console.log( $(this).find('#habit_title').attr('placeholder', 'Habit title cant be blank') );
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

////////////////////////////////////////////
// CLICK EVENTS TO UPDATE HABIT PROGRESS  //
////////////////////////////////////////////
var requestInProgress = false
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
