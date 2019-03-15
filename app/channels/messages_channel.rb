class MessagesChannel < ApplicationCable::Channel  
  def subscribed
    stream_for "messages"
  end
  
  def update_content(data)
    note = Note.find_by(id: data['noteId'])
    new_data = { content: data['content'], plain_text: data['plain_text'] }
    if note.update(new_data)
      socket = { userId: data['userId'], content: data['content'], plain_text: data['plain_text'], type: 'content' }
      MessagesChannel.broadcast_to('messages', socket)
    end
  end
  
  def update_title(data)
    socket = { title: data['title'], type: 'title' }
    MessagesChannel.broadcast_to('messages', socket)
  end

  def unsubscribed; end
end  