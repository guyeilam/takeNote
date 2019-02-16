class UpdateTags < ActiveRecord::Migration[5.2]
  def change
    add_index :tags, :label, unique: true
    add_index :taggings, [:note_id, :tag_id], unique: true
  end
end
