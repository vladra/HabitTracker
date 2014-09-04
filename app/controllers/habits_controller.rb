class HabitsController < ApplicationController
	before_filter :require_login

	def index
		@habits = current_user.habits.order(:order)
	end

	def edit_list
		@habits = current_user.habits.order(:order)
	end

	def show
		habit = Habit.find(params[:id])
		render json: {:habit => habit}
	end

	def edit
		@habit = Habit.find(params[:id])
		respond_to do |format|
			format.json { render json: {:habit => @habit} }
			format.js
		end
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
		@habit = Habit.find(params[:id])
		@habit.update(habit_params)
		respond_to do |format|
			format.json { render json: @habit }
    end
	end

	def destroy
		@habit = Habit.find(params[:id])
		@habit.destroy
		redirect_to edit_habits_path
	end

private

	def habit_params
		params.require(:habit).permit(:title, :goal, :period, :kind, :done)
	end

end
