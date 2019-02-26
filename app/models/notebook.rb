# == Schema Information
#
# Table name: notebooks
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Notebook < ApplicationRecord
  validates :title, :user_id, presence: true
  validates :title, uniqueness: true

  belongs_to :user
  has_many :notes, dependent: :destroy
end
