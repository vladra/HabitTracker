class Habit < ActiveRecord::Base
	belongs_to :user

	validates :title, presence: true

	before_create { |habit| habit.done = 0 }
end
