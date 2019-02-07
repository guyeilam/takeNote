json.notes do
  json.set! @note.id do
    json.extract! @note, :id, :title, :content, :plain_text, :updated_at
    json.updated_at @note.updated_at.strftime "%Y-%m-%d %H:%M:%S"
  end
end
