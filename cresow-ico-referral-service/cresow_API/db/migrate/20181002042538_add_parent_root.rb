class AddParentRoot < ActiveRecord::Migration[5.2]
  def change
  	add_column :users, :parent_root_id, :integer
  end
end
