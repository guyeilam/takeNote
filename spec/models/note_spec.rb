require 'spec_helper'

RSpec.describe Note, type: :model do
  describe "validations" do
    it { should validate_presence_of(:user_id) }
    it { should validate_presence_of(:notebook_id) }
  end

  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:notebook) }
    it { should have_many(:taggings) }
    it { should have_many(:tags).through(:taggings) }
    it { should have_many(:shares) }
    it { should have_many(:shared_users).through(:shares) }
  end
end