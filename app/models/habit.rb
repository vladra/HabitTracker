class Habit < ActiveRecord::Base
	belongs_to :user

	validates :title, presence: true
	validates :goal, numericality: { only_integer: true, greater_then: 0 }
	validates :done, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
	validates :period, inclusion: { in: %w(week) }
	validates :kind, inclusion: { in: %w(good bad) }

	before_validation(on: :create) { |habit| habit.done = 0; habit.order = habit.user.habits.length }

	def self.monday_reset
		update_all(done: 0)
	end

end
