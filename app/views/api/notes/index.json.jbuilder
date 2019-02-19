json.notes do
  @notes.each do |note|
    json.set! note.id do
      json.extract! note, :id, :title, :content, :plain_text, :updated_at, :notebook_id, :created_at
      json.updated_at note.updated_at.strftime "%b %d %l:%M:%S %P"
      json.tagIds note.taggings.pluck(:tag_id)
    end
  end
end