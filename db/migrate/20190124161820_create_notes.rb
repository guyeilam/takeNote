class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :content
      t.integer :user_id, null: false
      t.integer :notebook_id, null: false

      t.timestamps
    end
    add_index :notes, :title
  end
end
