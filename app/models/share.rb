class Share < ApplicationRecord
  validates :user_id, :note_id, presence: true

  belongs_to :user
  belongs_to :note
end