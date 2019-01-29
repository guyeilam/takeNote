# @notebooks.each do |notebook|
#   json.set! notebook.id do
#     json.extract! notebook, :id, :title, :user_id, :updated_at
#     json.note_ids []
#   end
# end

@notebooks.each do |notebook|
  json.set! notebook.id do
    json.partial! 'notebook', notebook: notebook
    json.noteIds notebook.notes.pluck(:id)
    json.note_titles do
      notebook.notes.each do |note|
        json.set! note.id do
          json.extract! note, :id, :title
        end
      end
    end
  end
end
