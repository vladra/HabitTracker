class HabitsController < ApplicationController
	before_filter :require_login

	def index
		@habits = current_user.habits.order(:order)
	end

	def create
		@habit = Habit.new(habit_params)
		@habit.user = current_user
		respond_to do |format|
			if @habit.save
				format.js
			else
				format.json { render json: {errors: @habit.errors}, status: 422 }
			end
    end
	end

	def update
		sleep 1
		@habit = Habit.find(params[:id])
		@habit.update(done: params[:habit][:done])
		@habit.save
		respond_to do |format|
			format.json { render json: @habit }
    end
	end

private

	def habit_params
		params.require(:habit).permit(:title, :goal, :period, :kind)
	end

end
