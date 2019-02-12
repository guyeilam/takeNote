class Tag < ApplicationRecord
  validates :label, :user_id, presence: true

  belongs_to :user
  has_many :taggings

  has_many :notes, through: :taggings
end