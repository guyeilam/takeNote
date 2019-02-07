json.notes do
  json.set! @note.id do
    json.extract! @note, :id, :title, :content, :plain_text, :updated_at
  end
end
