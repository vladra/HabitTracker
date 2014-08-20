# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u = User.new
u.email = 'svolard@gmail.com'
u.password = '11111111'
u.password_confirmation = '11111111'
u.save

h1 = u.habits.create(title: 'Learn programming', done: 2, goal: 5, period: 'week', kind: 'good', order: 0)
h2 = u.habits.create(title: 'Go to swimming pool', done: 1, goal: 3, period: 'week', kind: 'good', order: 1)
h3 = u.habits.create(title: 'Do exercises', done: 0, goal: 3, period: 'week', kind: 'good', order: 2)
h4 = u.habits.create(title: 'Drink less beer', done: 3, goal: 3, period: 'week', kind: 'bad', order: 3)
