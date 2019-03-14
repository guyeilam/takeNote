class MessagesChannel < ApplicationCable::Channel  
  def subscribed
    stream_for 'messages'
  end
  
  def update_content(data)
    socket = { content: data['content'], plain_text: data['plain_text'], type: 'content' }
    MessagesChannel.broadcast_to('messages', socket)
  end
  
  def update_title(data)
    socket = { title: data['title'], type: 'title' }
    MessagesChannel.broadcast_to('messages', socket)
  end
  
  def unsubscribed; end
end  