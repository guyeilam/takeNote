json.notebooks do
  json.set! @notebook.id do
    json.extract! @notebook, :id, :title, :user_id, :updated_at
    json.noteIds @notebook.notes.pluck(:id)
  end
end

json.notes do
  @notes.each do |note|
    json.set! note.id do
      json.extract! note, :id, :title, :content, :plain_text, :updated_at
    end
  end
end

# json.set! @notebook.id do
#     json.extract! @notebook, :id, :title, :user_id, :updated_at
#     json.note_ids []
# end
# json.notebook do
  # json.extract! @notebook, :id, :title
  # :note_ids
# end

# json.notes do
#   @notebook.notes.each do |note|
#     json.set! note.id do
#       json.partial! 'api/notes/note', note: note
#     end
#   end
# end

# json.notebooks do
#     json.partial! '/api/notebooks/notebook', notebook: @notebook
#     json.noteIds @notebook.notes.pluck(:id)
# end

# json.notes do
#   @notebook.notes.each do |note|
#     json.set! note.id do
#       json.extract! note, :id, :title, :content, :updated_at
#     end
#   end
# end


