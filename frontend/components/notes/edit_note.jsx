import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {withRouter} from 'react-router-dom';
import ReactQuill from 'react-quill';
import {
  setCurrentNote,
  updateNote,
  createNote,
  requestSingleNote,
  receiveUpdatedNote,
} from '../../actions/note_actions';
import NewTagging from './new_tagging';
import NoteHeader from '../notes/note_header';
import LoadingIcon from '../loading_icon/loading_icon';

const EditNote = () => {
  const dispatch = useDispatch();

  const currentId = useSelector(state => state.session.id);
  const currentNote = useSelector(state => state.ui.currentNote);
  const currentUser = useSelector(state => state.entities.users[currentId]) || null;
  const allNotes = useSelector(state => state.entities.notes[currentNote]);
  const loading = useSelector(state => state.ui.loading);

  useEffect(() => {
    dispatch(requestSingleNote(this.props.currentNote).then(() => {
      let noteContent;

      if (!this.props.notes.content) {
        noteContent = "";
      } else {
        noteContent = JSON.parse(this.props.notes.content);
      }

      this.setState({
        noteId: this.props.notes.id,
        title: this.props.notes.title,
        content: noteContent,
        plain_text: this.props.notes.plain_text,
      });
      this.editor.editor.setContents(this.state.content);
    }));

    if (currentNote) {
      if (
        !prevProps.currentNote ||
        prevProps.currentNote !== this.props.currentNote
      ) {
        this.clearSubscriptions();
        App.cable.subscriptions.create(
          {
            channel: 'MessagesChannel',
            room: this.props.currentNote.toString(),
          },
          {
            received: data => {
              switch (data.type) {
                case 'content':
                  let unprocDelta = this.state.unprocDelta;
                  unprocDelta.push(data['lastDeltaChangeSet']);
                  this.setState({
                    unprocDelta: unprocDelta,
                  });
                  if (data['userId'] !== this.props.currentId) {
                    this.processExternalChange();
                  }
                  break;
                case 'title':
                  if (data['userId'] !== this.props.currentId) {
                    this.setState({
                      title: data['title'],
                    });
                  }
                  break;
              }
              this.setState({
                typing: data['sent_by'],
              });
              setTimeout(() => {
                this.setState({
                  typing: null,
                });
              }, 1000);

              const note = Object.assign(
                {},
                {
                  id: data['noteId'],
                  user_id: data['noteUserId'],
                  title: data['title'],
                  content: '',
                  plain_text: '',
                  notebookTitle: data['notebookTitle'],
                  updated_at: data['updated_at'],
                  created_at: data['created_at'],
                  tagIds: data['tagIds'],
                  notebook_id: data['notebook_id'],
                },
              );

              this.updateNote(note);
            },
            updateContent: function(data) {
              return this.perform('update_content', data);
            },
            updateTitle: function(data) {
              return this.perform('update_title', data);
            },
          },
        );
      }
    }
  }, [notes]);

  const [toolbarVisibility, setToolbarVisibility] = useState('hidden');

  const showToolbar = () => toolbarVisibility === 'hidden' ? setToolbarVisibility('visible') : setToolbarVisibility('hidden');
    
  const clearSubscriptions = () => {
    App.cable.subscriptions.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}

export default withRouter(EditNote);