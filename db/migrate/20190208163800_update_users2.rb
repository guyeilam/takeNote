class UpdateUsers2 < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :default_notebook
    add_column :users, :default_notebook, :integer
  end
end
