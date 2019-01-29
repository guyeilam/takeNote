# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

User.delete_all
Notebook.delete_all
Note.delete_all

User.create!(
  email: 'demo@demo',
  password: 'password'
)

# Notebook.create!(title: 'User-centric grid-enabled array', user_id: User.first.id)
# Notebook.create!(title: 'Progressive explicit infrastructure', user_id: User.first.id)
# Notebook.create!(title: 'Balanced bandwidth-monitored encryption', user_id: User.first.id)
# Notebook.create!(title: 'Adaptive neutral internet solution', user_id: User.first.id)
# Notebook.create!(title: 'Upgradable multi-state implementation', user_id: User.first.id)
# Notebook.create!(title: 'Profit-focused zero administration task-force', user_id: User.first.id)
# Notebook.create!(title: 'User-friendly systemic groupware', user_id: User.first.id)
# Notebook.create!(title: 'Profound intermediate Graphic Interface', user_id: User.first.id)
# Notebook.create!(title: 'Upgradable radical paradigm', user_id: User.first.id)
# Notebook.create!(title: 'Cross-group actuating monitoring', user_id: User.first.id)
# Notebook.create!(title: 'Up-sized dedicated definition', user_id: User.first.id)
# Notebook.create!(title: 'Total disintermediate matrix', user_id: User.first.id)
# Notebook.create!(title: 'Diverse solution-oriented process improvement', user_id: User.first.id)
# Notebook.create!(title: 'Intuitive explicit structure', user_id: User.first.id)
# Notebook.create!(title: 'Mandatory fresh-thinking website', user_id: User.first.id)
# Notebook.create!(title: 'Phased radical installation', user_id: User.first.id)
# Notebook.create!(title: 'Configurable static flexibility', user_id: User.first.id)
# Notebook.create!(title: 'Total composite intranet', user_id: User.first.id)
# Notebook.create!(title: 'Phased foreground website', user_id: User.first.id)
# Notebook.create!(title: 'Cross-platform multimedia process improvement', user_id: User.first.id)
# Notebook.create!(title: 'Customizable static monitoring', user_id: User.first.id)
# Notebook.create!(title: 'Cloned directional methodology', user_id: User.first.id)
# Notebook.create!(title: 'Inverse fresh-thinking website', user_id: User.first.id)
# Notebook.create!(title: 'Virtual zero tolerance capability', user_id: User.first.id)
# Notebook.create!(title: 'Digitized tertiary website', user_id: User.first.id)
# Notebook.create!(title: 'Persistent clear-thinking knowledge user', user_id: User.first.id)
# Notebook.create!(title: 'Synchronised optimal encoding', user_id: User.first.id)
# Notebook.create!(title: 'Virtual encompassing focus group', user_id: User.first.id)
# Notebook.create!(title: 'Multi-lateral secondary hub', user_id: User.first.id)
# Notebook.create!(title: 'Assimilated motivating collaboration', user_id: User.first.id)
# Notebook.create!(title: 'Extended background installation', user_id: User.first.id)
# Notebook.create!(title: 'Configurable system-worthy definition', user_id: User.first.id)
# Notebook.create!(title: 'Persevering zero tolerance moratorium', user_id: User.first.id)
# Notebook.create!(title: 'User-centric real-time portal', user_id: User.first.id)
# Notebook.create!(title: 'User-centric encompassing service-desk', user_id: User.first.id)
# Notebook.create!(title: 'Exclusive disintermediate leverage', user_id: User.first.id)
# Notebook.create!(title: 'Inverse content-based software', user_id: User.first.id)
# Notebook.create!(title: 'Public-key context-sensitive website', user_id: User.first.id)
# Notebook.create!(title: 'Total exuding moratorium', user_id: User.first.id)
# Notebook.create!(title: 'Implemented didactic artificial intelligence', user_id: User.first.id)
# Notebook.create!(title: 'Re-engineered 3rd generation firmware', user_id: User.first.id)
# Notebook.create!(title: 'Universal system-worthy solution', user_id: User.first.id)
# Notebook.create!(title: 'Diverse solution-oriented access', user_id: User.first.id)
# Notebook.create!(title: 'Inverse 5th generation info-mediaries', user_id: User.first.id)
# Notebook.create!(title: 'Reverse-engineered didactic architecture', user_id: User.first.id)
# Notebook.create!(title: 'Up-sized web-enabled local area network', user_id: User.first.id)
# Notebook.create!(title: 'Proactive maximized portal', user_id: User.first.id)
# Notebook.create!(title: 'Triple-buffered stable parallelism', user_id: User.first.id)
# Notebook.create!(title: 'Horizontal heuristic success', user_id: User.first.id)
# Notebook.create!(title: 'Re-engineered zero defect leverage', user_id: User.first.id)
# Notebook.create!(title: 'Total value-added forecast', user_id: User.first.id)
# Notebook.create!(title: 'Integrated mission-critical synergy', user_id: User.first.id)
# Notebook.create!(title: 'Persevering methodical policy', user_id: User.first.id)
# Notebook.create!(title: 'Diverse static local area network', user_id: User.first.id)
# Notebook.create!(title: 'Mandatory executive application', user_id: User.first.id)
# Notebook.create!(title: 'Mandatory secondary challenge', user_id: User.first.id)
# Notebook.create!(title: 'Multi-layered eco-centric framework', user_id: User.first.id)
# Notebook.create!(title: 'Customizable fresh-thinking pricing structure', user_id: User.first.id)
# Notebook.create!(title: 'Profound solution-oriented matrix', user_id: User.first.id)
# Notebook.create!(title: 'Sharable client-driven archive', user_id: User.first.id)
# Notebook.create!(title: 'Networked homogeneous collaboration', user_id: User.first.id)
# Notebook.create!(title: 'Decentralized executive toolset', user_id: User.first.id)
# Notebook.create!(title: 'User-centric actuating emulation', user_id: User.first.id)
# Notebook.create!(title: 'Automated needs-based initiative', user_id: User.first.id)
# Notebook.create!(title: 'Stand-alone leading edge ability', user_id: User.first.id)
# Notebook.create!(title: 'Assimilated user-facing success', user_id: User.first.id)
# Notebook.create!(title: 'Enhanced needs-based implementation', user_id: User.first.id)
# Notebook.create!(title: 'Virtual exuding database', user_id: User.first.id)
# Notebook.create!(title: 'Self-enabling holistic knowledge user', user_id: User.first.id)
# Notebook.create!(title: 'Re-contextualized asynchronous customer loyalty', user_id: User.first.id)
# Notebook.create!(title: 'Inverse systematic attitude', user_id: User.first.id)
# Notebook.create!(title: 'Pre-emptive attitude-oriented functionalities', user_id: User.first.id)
# Notebook.create!(title: 'Ergonomic non-volatile instruction set', user_id: User.first.id)
# Notebook.create!(title: 'Open-architected bandwidth-monitored focus group', user_id: User.first.id)
# Notebook.create!(title: 'Optimized disintermediate challenge', user_id: User.first.id)
# Notebook.create!(title: 'Organic global neural-net', user_id: User.first.id)
# Notebook.create!(title: 'Business-focused demand-driven monitoring', user_id: User.first.id)
# Notebook.create!(title: 'Enhanced background migration', user_id: User.first.id)
# Notebook.create!(title: 'De-engineered multi-tasking success', user_id: User.first.id)
# Notebook.create!(title: 'Customizable bandwidth-monitored synergy', user_id: User.first.id)
# Notebook.create!(title: 'Fundamental coherent leverage', user_id: User.first.id)
# Notebook.create!(title: 'Secured actuating solution', user_id: User.first.id)
# Notebook.create!(title: 'Face to face human-resource migration', user_id: User.first.id)
# Notebook.create!(title: 'Digitized grid-enabled matrices', user_id: User.first.id)
# Notebook.create!(title: 'Intuitive full-range parallelism', user_id: User.first.id)
# Notebook.create!(title: 'Profound needs-based encryption', user_id: User.first.id)
# Notebook.create!(title: 'Integrated maximized orchestration', user_id: User.first.id)
# Notebook.create!(title: 'Realigned cohesive infrastructure', user_id: User.first.id)
# Notebook.create!(title: 'Sharable bifurcated adapter', user_id: User.first.id)
# Notebook.create!(title: 'Upgradable 4th generation application', user_id: User.first.id)
# Notebook.create!(title: 'Face to face contextually-based methodology', user_id: User.first.id)
# Notebook.create!(title: 'Advanced asymmetric analyzer', user_id: User.first.id)
# Notebook.create!(title: 'Team-oriented systemic neural-net', user_id: User.first.id)
# Notebook.create!(title: 'Advanced tangible methodology', user_id: User.first.id)
# Notebook.create!(title: 'Optional analyzing customer loyalty', user_id: User.first.id)
# Notebook.create!(title: 'Customer-focused neutral initiative', user_id: User.first.id)
# Notebook.create!(title: 'Operative optimizing help-desk', user_id: User.first.id)
# Notebook.create!(title: 'Automated maximized orchestration', user_id: User.first.id)
# Notebook.create!(title: 'Profit-focused clear-thinking intranet', user_id: User.first.id)
# Notebook.create!(title: 'Polarised methodical local area network', user_id: User.first.id)

# Note.create!(title: 'Note 1', content: 'Content of note 1', user_id: User.first.id, notebook_id: Notebook.first.id)
# Note.create!(title: 'Note 2', content: 'Content of note 2', user_id: User.first.id, notebook_id: Notebook.first.id)
# Note.create!(title: 'Note 3', content: 'Content of note 3', user_id: User.first.id, notebook_id: Notebook.first.id)
# Note.create!(title: 'Note 4', content: 'Content of note 4', user_id: User.first.id, notebook_id: Notebook.first.id)
# Note.create!(title: 'Note 5', content: 'Content of note 5', user_id: User.first.id, notebook_id: Notebook.first.id)
# Note.create!(title: 'Note 6', content: 'Content of note 6', user_id: User.first.id, notebook_id: Notebook.first.id)
# Note.create!(title: 'Note 7', content: 'Content of note 7', user_id: User.first.id, notebook_id: Notebook.first.id)

7.times do
  Notebook.create!(
    title: Faker::Lorem.sentence(word_count = 4, supplemental = false, random_words_to_add = 0)[0...-1],
    user_id: User.first.id
  )
end

100.times do
    Note.create!(
      title: Faker::Lorem.sentence(word_count = 10, supplemental = false, random_words_to_add = 0)[0...-1],
      content: Faker::Lorem.paragraph(sentence_count = 100, supplemental = false, random_sentences_to_add = 0),
      user_id: User.first.id,
      notebook_id: Notebook.all.sample.id
    )
end