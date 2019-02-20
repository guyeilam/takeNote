# def my_quick_sort(arr)
#   prc = proc { |a, b| a <=> b }
#   return arr if arr.size < 2

#   pivot = arr.first
#   left = arr[1..-1].select{|el| prc.call(el.updated_at, pivot.updated_at) == -1}
#   right = arr[1..-1].select{|el| prc.call(el.updated_at, pivot.updated_at) != -1}

#   my_quick_sort(left) + [pivot] + my_quick_sort(right)
# end

json.notebooks do
  json.set! @notebook.id do
    json.extract! @notebook, :id, :title, :user_id, :updated_at, :created_at
    json.noteIds @notebook.notes.sort_by { |note| note.updated_at }.reverse.pluck(:id)
    json.updated_at @notebook.updated_at.strftime "%b %d %l:%M:%S %P"
  end
end

# sortedNotes = my_quick_sort(@notebook.notes)
# sortedNotes = @notebook.notes.sort_by { |note| note.updated_at }.reverse

json.notes do
  @notebook.notes.each do |note|
    json.set! note.id do
      json.extract! note, :id, :title, :content, :plain_text, :updated_at, :notebook_id, :created_at
      json.updated_at note.updated_at.strftime "%b %d %l:%M:%S %P"
      json.tagIds note.taggings.pluck(:tag_id)
      json.notebookTitle note.notebook.title
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


