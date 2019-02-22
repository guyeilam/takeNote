import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { setCurrentNote, updateNote, createNote } from '../../actions/note_actions';
import NewTagging from './new_tagging';
import NoteHeader from './note_header';

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteId: null,
      title: '',
      content: '',
      plain_text: '',
      theme: 'snow',
      toolbarVisibility: 'hidden'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.showToolbar = this.showToolbar.bind(this);
  }

  showToolbar() {
    if (this.state.toolbarVisibility == 'hidden') {
      this.setState({ toolbarVisibility: 'visible' });
    } else {
      this.setState({ toolbarVisibility: 'hidden' });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.notes) {
      if (!prevProps.notes || (prevProps.notes.id !== this.props.notes.id) || (this.state.noteId !== this.props.currentNote)) {
        this.setState({
          noteId: this.props.notes.id,
          title: this.props.notes.title,
          content: this.props.notes.content,
          plain_text: this.props.notes.plain_text
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.setCurrentNote(null);
  }

  handleChange(field) {
    return (e) => {
      return this.setState({ [field]: e.currentTarget.value });
    }
  }

  handleEditorChange(content, delta, source, editor) {
    this.setState({
      content: content,
      plain_text: editor.getText().trim()
    });
  }

  saveNote() {
    const note = Object.assign({}, { id: this.state.noteId, content: this.state.content, plain_text: this.state.plain_text, notebook_id: this.props.defaultNotebook });
    this.props.updateNote(note);
  }

  handleSubmit(e) {
    e.preventDefault();
    // const notebookId = this.props.notes[this.props.currentNote].notebook_id;
    const note = Object.assign({}, { id: this.props.currentNote, title: this.state.title, content: this.state.content, plain_text: this.state.plain_text });
    this.props.updateNote(note);
  }

  render() {
    if ((!this.props.notes) || (Object.values(this.props.notes).length === 0)) {
      return (
        <div className='note-edit'></div>
      );
    }

    let saveButtonDisabled = true;

    if (this.props.currentNote) {
      saveButtonDisabled = false;
    }

    const toolbar = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': [] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video', 'formula'],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    return (
      <div className='note-edit'>

      <NoteHeader />

        <div className='note-edit-container'>
          <div className='note-form'>
            <form className='note-edit-form' onSubmit={(e) => this.handleSubmit(e)}>
              <div className='edit-submit-button'>
                <input className='form-button' type='submit' value='Save' disabled={saveButtonDisabled}/>
              </div>
              <input className='edit-form-title-input' required id='noteTitle' placeholder='Title' type='text' value={this.state.title} onChange={this.handleChange('title')} />
            </form>
          <div className='app'>
            <div className='quill-container'>
              <ReactQuill value={this.state.content}
                onChange={this.handleEditorChange}
                onFocus={this.showToolbar}
                theme={this.state.theme}
                modules={{ toolbar }}
                bounds={'.app'}
                placeholder={'New note...'}>
              </ReactQuill>
            </div>
            </div>
          </div>
        </div>
        
        <div className='note-taggings'>
          <NewTagging />
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  
  return ({
    notes: state.entities.notes[state.ui.currentNote],
    defaultNotebook: currentUser.default_notebook,
    currentNote: state.ui.currentNote
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    setCurrentNote: noteId => dispatch(setCurrentNote(noteId)),
    updateNote: note => dispatch(updateNote(note)),
    createNote: note => dispatch(createNote(note))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditNote));