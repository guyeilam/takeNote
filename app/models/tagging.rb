class Tagging < ApplicationRecord
  validates :note_id, :tag_id, presence: true

  belongs_to :note
  belongs_to :tag
end