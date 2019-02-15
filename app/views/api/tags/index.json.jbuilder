
tagsHash = Hash.new{ |h, k| h[k] = Array.new(0) }
@tags.each do |tag|
  tagsHash[tag.label[0].to_s] << tag
end

json.tags do
  @tags.each do |tag|
    # json.set! tag.label[0] do
      json.set! tag.id do
        json.extract! tag, :id, :label, :user_id
      end
    # end
  end
end