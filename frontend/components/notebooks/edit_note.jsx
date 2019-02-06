import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { setCurrentNote } from '../../actions/note_actions';

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteId: null,
      title: '',
      content: '',
      // notebookId: this.props.notebookId,
      // userId: this.props.currentUser.id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.notes) {
      if (!prevProps.notes || (prevProps.notes.id !== this.props.notes.id)) {
        this.setState({
          noteId: this.props.notes.id,
          title: this.props.notes.title,
          content: this.props.notes.content
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

  handleQChange(value) {
    this.setState({ content: value });
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
                modules={{ toolbar }}>
              </ReactQuill>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    notes: state.entities.notes[state.ui.currentNote]
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditNote));