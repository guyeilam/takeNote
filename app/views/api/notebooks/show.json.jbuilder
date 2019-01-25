json.set! @notebook.id do
    json.extract! @notebook, :id, :title, :user_id, :updated_at
    json.note_ids []
end
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