require 'spec_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_presence_of(:session_token) }
    it { should validate_uniqueness_of(:email) }
  end

  describe "associations" do
    it { should have_many(:notebooks) }
    it { should have_many(:notes) }
    it { should have_many(:tags) }
    it { should have_many(:shared_notes).through(:shares) }
  end
end