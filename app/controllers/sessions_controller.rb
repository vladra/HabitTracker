class SessionsController < ApplicationController

	def new
		@user = User.new
	end

	def create
		if @user = login(params[:email], params[:password])
			redirect_back_or_to(:habits, notice: 'Login successful!' )
		else
			flash.now[:alert] = "Can't find user with this email, or password is incorrect"
			render action: 'new'
		end
	end

	def destroy
		logout
    redirect_to(:users, notice: 'Logged out!')
	end

end
