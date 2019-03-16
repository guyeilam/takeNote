class MessagesChannel < ApplicationCable::Channel  
  def subscribed
    # note = Note.find_by(params[:room])
    stream_for "note_#{params[:room]}"
  end
  
  def update_content(data)
    note = Note.find_by(id: data['noteId'])
    new_data = { content: data['content'], plain_text: data['plain_text'] }
    if note.update(new_data)
      socket = { userId: data['userId'], content: data['content'], plain_text: data['plain_text'], noteId: note.id, type: 'content' }
      MessagesChannel.broadcast_to("note_#{note.id}", socket)
    end
  end
  
  def update_title(data)
    socket = { title: data['title'], type: 'title' }
    MessagesChannel.broadcast_to('messages', socket)
  end

  def unsubscribed; end
end  