class UsersController < ApplicationController

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		if @user.save
			auto_login(@user)
			redirect_to root_path
		else
			render new
		end
	end

	def update
		@user = current_user
		respond_to do |format|
			if @user.update(user_params)
				format.js
			else
				format.json { render json: {errors: @user.errors}, status: 422 }
			end
		end
	end

private

	def user_params
		params.require(:user).permit(:email, :password, :password_confirmation)
	end
end
