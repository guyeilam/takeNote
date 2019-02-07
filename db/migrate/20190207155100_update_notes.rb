class UpdateNotes < ActiveRecord::Migration[5.2]
  def change
    add_column :notes, :plain_text, :text
  end
end
