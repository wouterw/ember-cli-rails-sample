class Quiz < ActiveRecord::Base
  validates :title, presence: true
end
