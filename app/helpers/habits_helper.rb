module HabitsHelper

	def habit_progress(habit)
		done = habit.done
		goal = habit.goal
		html = ''
		goal.times do |i|
			(i < done) ? html << content_tag(:i, nil, class: "icon-#{habit.kind} done") : html << content_tag(:i, nil, class: "icon-#{habit.kind}")
		end
		html.html_safe
	end

end
