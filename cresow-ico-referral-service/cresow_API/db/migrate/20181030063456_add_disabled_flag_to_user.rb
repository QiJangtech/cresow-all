class AddDisabledFlagToUser < ActiveRecord::Migration[5.2]
  def change
  	add_column :users, :disabled, :boolean, default: false, null: false
  end
end
