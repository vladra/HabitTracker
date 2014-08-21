$('#habits').append("<%= escape_javascript(render @habit) %>").children().last().find('.progress').click(progressAjaxRequest);
