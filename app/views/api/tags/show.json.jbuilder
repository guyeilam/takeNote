json.tags do
    # json.set! tag.label[0] do
      json.set! @tag.id do
        json.extract! @tag, :id, :label, :user_id
        json.noteIds @tag.taggings.pluck(:note_id)
  end
end

json.notes do
  @tag.notes.each do |note|
    json.set! note.id do
      json.extract! note,  :id, :title, :content, :plain_text, :updated_at, :notebook_id, :created_at
    json.updated_at note.updated_at.strftime "%b %d %l:%M:%S %P"
    json.tagIds note.taggings.pluck(:tag_id)
    json.notebookTitle note.notebook.title
    end
  end
end