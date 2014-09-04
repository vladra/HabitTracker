task :monday_reset => :environment do
	if Time.now.monday?
	  Habit.monday_reset
	  puts 'Monday reset done'
	else
		puts "Not monday today, task canceled"
	end
end
