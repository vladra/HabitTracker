class Habit < ActiveRecord::Base
	belongs_to :user

	validates :title, presence: true
	validates :goal, numericality: { only_integer: true, greater_then: 0 }

	before_create { |habit| habit.done = 0 }
end
