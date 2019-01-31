import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NotebookDetailNoteItem from './notebook_detail_note_item';
import ReactQuill from 'react-quill';

class NotebookDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      noteId: null,
      title: '',
      content: '',
      notebookId: this.props.notebookId,
      userId: this.props.currentUser.id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }
  
   componentDidMount() {

    if (this.props.showAllNotes === true) {
      this.props.requestAllNotes();
    } else {
      this.props.requestSingleNotebook(this.props.notebookId);
    }
  }
  
  componentDidUpdate(prevProps) {
    if ((!prevProps.currentNote && this.props.currentNote) || (this.props.currentNote && prevProps.currentNote && (this.props.currentNote.id !== prevProps.currentNote.id))) {
      this.setState({
        noteId: this.props.currentNote.id,
        title: this.props.currentNote.title,
        content: this.props.currentNote.content,
        userId: this.props.currentUser.id
      });
    }
  }
    
  handleChange(field) {
    return (e) => {
      return this.setState({ [field]: e.currentTarget.value });
    }
  }

  handleQChange(value) {
    this.setState({ content: value });
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

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.noteId) {
      const note = Object.assign({}, { id: this.state.noteId, title: this.state.title, content: this.state.content });
      this.props.updateNote(note);
    } else {
      const note = Object.assign({}, { title: this.state.title, content: this.state.content });
      this.props.createNote(note);
    }
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
        <div className='notebook-detail-notes-container'>
          <div className='notebook-detail-notes'>
            <div className='notebook-detail-notebook-title'>{notebookTitle}</div>
            <div className='notebook-detail-notes-count'><p>{this.props.notes.length} notes</p></div>
            <ul className='notebook-detail-notes-list'>
              {this.props.notes.map(note => <NotebookDetailNoteItem key={note.id} note={note} handleNoteClick={this.handleNoteClick}/>)}
            </ul>
          </div>
          <div className='note-edit'>
            <div className='note-edit-container'>
              <div className='note-form'>
                <form className='note-edit-form' onSubmit={(e) => this.handleSubmit(e)}>
                  <div className='edit-submit-button'>
                    <input className='form-button' type='submit' value='Save' />
                  </div>
                  <input className='edit-form-title-input' required id='noteTitle' placeholder='Title' type='text' value={this.state.title} onChange={this.handleChange('title')} />
                </form>
              
                <div className='quill-container'>
                  <ReactQuill value={this.state.content}
                    onChange={this.handleQChange} 
                    modules={{toolbar}}>
                  </ReactQuill>
                </div>
                {/* <div className='note-edit-buttons-container'>
                  <div className='note-edit-delete-button'><button onClick={() => this.props.deleteNote(this.state.noteId)}>Delete note</button></div>
                </div> */}
              
              </div>
            </div>
            
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(NotebookDetail);