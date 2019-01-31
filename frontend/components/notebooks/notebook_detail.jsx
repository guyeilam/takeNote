import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LeftNavBar from '../left_nav_bar/left_nav_bar';
import NoteEditContainer from '../notes/note_edit_container';
import NotebookDetailNoteItem from './notebook_detail_note_item';
import ReactQuill from 'react-quill';

class NotebookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteId: null,
      title: '',
      content: '',
      notebookId: this.props.match.params.notebookId,
      userId: this.props.currentUser.id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }
  
  componentDidMount() {
    if (this.props.showAllNotes === true) {
      this.props.requestAllNotes();
    } else {
      this.props.requestSingleNotebook(this.props.match.params.notebookId);
    }
  }
  
  handleChange(value) {
    this.setState({ content: value })
  }

  handleNoteClick(note) {
    return () => this.setState({ 
      noteId: note.id,
      title: note.title,
      content: note.content,
      notebookId: note.notebook_id,
      userId: note.user_id
    })
  }

  saveNote() {
    const note = Object.assign({}, { id: this.state.noteId, content: this.state.content });
    this.props.updateNote(note);
  }

  render() {
    let notebookTitle;

    if (!this.props.notebooks) return null;
    if (this.props.showAllNotes === true) {
      notebookTitle = 'All Notes';
    } else {
      notebookTitle = this.props.notebooks.title;
    }

    const toolbar = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    return (
      <section className='notebook-detail'>
        <div className='left-navbar'>
          <LeftNavBar currentUser={this.props.currentUser} />
        </div>
        <div className='left-navbar-spacer'></div>
        <div className='notebook-detail-notes-container'>
          <div className='notebook-detail-notes'>
            <div className='notebook-detail-notebook-title'>{notebookTitle}</div>
            <div className='notebook-detail-notes-count'><p>{this.props.notes.length} notes</p></div>
            <ul className='notebook-detail-notes-list'>
              {this.props.notes.map(note => <NotebookDetailNoteItem key={note.id} note={note} handleNoteClick={this.handleNoteClick}/>)}
            </ul>
          </div>
          <div className='note-edit'>
            {/* <NoteEditContainer note={noteId}/> */}
            <div className='note-edit-container'>
              <ReactQuill value={this.state.content}
                onChange={this.handleChange} 
                modules={{toolbar}}>
                </ReactQuill>
            </div>
            <div className='note-edit-save-button'><button onClick={() => this.saveNote()}>Save</button></div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(NotebookDetail);