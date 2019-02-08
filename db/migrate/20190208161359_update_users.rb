class UpdateUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :default_notebook, :integer, null: false
  end
end
