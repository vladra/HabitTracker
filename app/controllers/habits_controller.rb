class HabitsController < ApplicationController
	before_filter :require_login

	def index
		@habits = current_user.habits
	end

	def create
		sleep 1
		@habit = Habit.new(habit_params)
		@habit.done = 0
		respond_to do |format|
			format.js
    end
	end

private

	def habit_params
		params.require(:habit).permit(:title, :goal, :period, :kind)
	end

end
