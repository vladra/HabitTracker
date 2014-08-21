module HabitsHelper

	def habit_progress(habit)
		done = habit.done
		goal = habit.goal
		html = ''
		unless goal == nil
			done.times { |i| html << content_tag(:i, nil, class: "icon-#{habit.kind} progress done") }
			(goal-done).times { |i| html << content_tag(:i, nil, class: "icon-#{habit.kind} progress") }
		end
		content_tag(:p, html.html_safe, class: '')
	end

end
