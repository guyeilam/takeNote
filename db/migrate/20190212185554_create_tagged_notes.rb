class CreateTaggedNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :tagged_notes do |t|
      t.integer :user_id, null: false
      t.integer :tag_id, null: false

      t.timestamps
    end
  end
end
