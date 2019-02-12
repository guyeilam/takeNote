json.taggings do
  @taggings.each do |tagging|
    json.set! tagging.tag_id do
      json.extract! tagging, :tag_id, :note_id
    end
  end
end