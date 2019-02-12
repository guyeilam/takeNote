class CreateTags < ActiveRecord::Migration[5.2]
  def change
    create_table :tags do |t|
      t.string :label, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
