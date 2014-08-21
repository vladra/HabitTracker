module HabitsHelper

	def habit_progress(habit)
		done = habit.done
		goal = habit.goal
		html = ''
		unless goal == nil
			goal.times do |i|
				(i < done) ? html << content_tag(:i, nil, class: "icon-#{habit.kind} done") : html << content_tag(:i, nil, class: "icon-#{habit.kind}")
			end
		end
		html.html_safe
	end

end
