# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Notebook.delete_all

User.create!(
  email: 'demo@demo',
  password: 'password'
)

User.create!(
  email: 'User 2',
  password: 'password'
)

Notebook.create!(
  title: 'Notebook One',
  user_id: User.first.id
)

Notebook.create!(
  title: 'Notebook Two by first user',
  user_id: User.first.id
)

Notebook.create!(
  title: 'Notebook Three by first user',
  user_id: User.first.id
)

Notebook.create!(
  title: 'Notebook Two',
  user_id: User.last.id
)