json.notes do
  @shared_notes.each do |note|
    json.set! note.id do
      json.extract! note, :id, :title, :plain_text, :updated_at, :notebook_id, :created_at, :user_id
      json.updated_at note.updated_at.strftime "%b %d %l:%M:%S %P"
      json.tagIds note.taggings.pluck(:tag_id)
      json.sharedUserIds note.shares.pluck(:user_id)
      json.sharedUserEmails note.shared_users.pluck(:email)
      json.notebookTitle note.notebook.title
    end
  end
end