class CreateHabits < ActiveRecord::Migration
  def change
    create_table :habits do |t|
      t.string :title
      t.integer :done
      t.integer :goal
      t.string :period
      t.string :kind
      t.integer :order
      t.belongs_to :user

      t.timestamps
    end
  end
end
