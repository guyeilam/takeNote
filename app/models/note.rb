# == Schema Information
#
# Table name: notes
#
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  content     :text
#  user_id     :integer          not null
#  notebook_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Note < ApplicationRecord
  validates :user_id, :notebook_id, presence: true

  belongs_to :user
  belongs_to :notebook

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
end
