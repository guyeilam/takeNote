json.notebooks do
  @notebooks.each do |notebook|
    json.set! notebook.id do
      json.extract! notebook, :id, :title, :user_id, :updated_at
      json.updated_at notebook.updated_at.strftime "%b %d %l:%M:%S %P"
      json.noteIds notebook.notes.pluck(:id)
    end
  end
end

json.notes do
  @notes.each do |note|
    json.set! note.id do
      json.extract! note, :id, :title, :content, :plain_text, :updated_at
      json.tagIds note.taggings.pluck(:tag_id)
      # json.updated_at note.updated_at.strftime "%Y-%m-%d %H:%M:%S"
      json.updated_at note.updated_at.strftime "%b %d %l:%M:%S %P"
    end
  end
end


# @notebooks.each do |notebook|
#   json.set! notebook.id do
#     json.extract! notebook, :id, :title, :user_id, :updated_at
#     json.note_ids []
#   end
# end


# @notebooks.each do |notebook|
#   json.set! notebook.id do
#     json.partial! 'notebook', notebook: notebook
#     json.noteIds notebook.notes.pluck(:id)
#     json.note_titles do
#       notebook.notes.each do |note|
#         json.set! note.id do
#           json.extract! note, :id, :title, :updated_at
#         end
#       end
#     end
#   end
# end

