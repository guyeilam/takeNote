json.tags do
    # json.set! @tag.label[0] do
      json.set! @tag.id do
        json.extract! @tag, :id, :label, :user_id
    end
  # end
end

json.notes do
  @tag.notes.each do |note|
    json.set! note.id do
      json.extract! note,  :id, :title, :content, :plain_text, :updated_at, :notebook_id, :created_at
    json.updated_at note.updated_at.strftime "%Y-%m-%d %H:%M:%S"
    end
  end
end