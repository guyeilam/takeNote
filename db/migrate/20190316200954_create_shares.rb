class CreateShares < ActiveRecord::Migration[5.2]
  def change
    create_table :shares do |t|
      t.integer :user_id, null: false
      t.integer :note_id, null: false

      t.timestamps
    end
  end
end
