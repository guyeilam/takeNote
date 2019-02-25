json.notebooks do
  json.set! @notebook.id do
    json.partial! 'notebook', notebook: @notebook
    json.updated_at @notebook.updated_at.strftime "%b %d %l:%M:%S %P"
  end
end

json.notes do
  @notebook.notes.each do |note|
    json.set! note.id do
      json.extract! note, :id, :title, :plain_text, :updated_at, :notebook_id, :created_at
      json.updated_at note.updated_at.strftime "%b %d %l:%M:%S %P"
    end
  end
end


