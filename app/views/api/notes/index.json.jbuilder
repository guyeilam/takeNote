json.notes do
  @notes.each do |note|
    json.set! note.id do
      json.extract! note, :id, :title, :plain_text, :updated_at, :notebook_id, :created_at, :user_id, :content
      json.updated_at note.updated_at.strftime "%b %d %l:%M:%S %P"
      json.tagIds note.taggings.pluck(:tag_id)
      json.notebookTitle note.notebook.title
    end
  end
end