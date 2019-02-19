json.notes do
  json.set! @note.id do
    json.extract! @note, :id, :title, :content, :plain_text, :updated_at, :notebook_id
    json.updated_at @note.updated_at.strftime "%b %d %l:%M:%S %P"
    json.tagIds @note.taggings.pluck(:tag_id)
  end
end

json.tags do
  @note.tags.each do |tag|
    json.set! tag.id do
      json.extract! tag, :id, :label
    end
  end
end

# json.notebooks do
#   json.set! @notebook.id do
#     json.extract! @notebook, :id, :title, :user_id, :updated_at
#     json.noteIds @notebook.notes.pluck(:id)
#   end
# end
