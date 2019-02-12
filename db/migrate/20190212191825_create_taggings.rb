class CreateTaggings < ActiveRecord::Migration[5.2]
  def change
    drop_table :tagged_notes
    create_table :taggings do |t|
      t.integer :user_id, null: false
      t.integer :tag_id, null: false

      t.timestamps
    end
  end
end
