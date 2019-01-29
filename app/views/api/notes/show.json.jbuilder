json.notes do
  json.set! @note.id do
    json.extract! @note, :id, :title, :content
  end
end
