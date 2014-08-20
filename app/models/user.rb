class User < ActiveRecord::Base
  authenticates_with_sorcery!

  has_many :habits

  # validations
  validates :email, uniqueness: true, format: {with: /.+@.+\..+/i}
  validates :password, length: { minimum: 3 }, confirmation: true
  validates :password_confirmation, presence: true

end
