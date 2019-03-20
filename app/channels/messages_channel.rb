class MessagesChannel < ApplicationCable::Channel  
  def subscribed
    stream_for "note_#{params[:room]}"
  end
  
  def update_content(data)
    lastDeltaChangeSet = data['lastDeltaChangeSet']
    note = Note.find_by(id: data['noteId'])
    current_user = User.find_by(id: data['userId'])
    new_data = { content: data['content'], plain_text: data['plain_text'] }
    if note.update(new_data)
      socket = { sent_by: current_user.email, userId: data['userId'], noteUserId: note.user_id, noteId: note.id, updated_at: note.updated_at.strftime("%b %d %l:%M:%S %P"), created_at: note.created_at.strftime("%b %d %l:%M:%S %P"), title: note.title, notebookTitle: note.notebook.title, lastDeltaChangeSet: lastDeltaChangeSet, tagIds: note.taggings.pluck(:tag_id), notebook_id: note.notebook_id, type: 'content' }
      MessagesChannel.broadcast_to("note_#{note.id}", socket)
    end
  end
  
  def update_title(data)
    note = Note.find_by(id: data['noteId'])
    current_user = User.find_by(id: data['userId'])
    new_data = { title: data['title'] }
    if note.update(new_data)
      socket = { sent_by: current_user.email, userId: data['userId'], noteUserId: note.user_id, noteId: note.id, updated_at: note.updated_at.strftime("%b %d %l:%M:%S %P"), created_at: note.created_at.strftime("%b %d %l:%M:%S %P"), title: note.title, notebookTitle: note.notebook.title, tagIds: note.taggings.pluck(:tag_id), notebook_id: note.notebook_id, type: 'title' }
      MessagesChannel.broadcast_to("note_#{note.id}", socket)
    end
  end

  def unsubscribed; end
end  