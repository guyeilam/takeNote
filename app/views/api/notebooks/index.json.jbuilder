@notebooks.each do |notebook|
  json.set! notebook.id do
    json.extract! notebook, :id, :title, :user_id, :updated_at
    json.note_ids []
  end
end