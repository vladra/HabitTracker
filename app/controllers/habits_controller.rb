class HabitsController < ApplicationController
	before_filter :require_login

	def index
		@habits = current_user.habits
	end
end
