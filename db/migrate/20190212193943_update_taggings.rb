class UpdateTaggings < ActiveRecord::Migration[5.2]
  def change
    drop_table :taggings
    create_table :taggings do |t|
      t.integer :note_id, null: false
      t.integer :tag_id, null: false

      t.timestamps
    end
  end
end
