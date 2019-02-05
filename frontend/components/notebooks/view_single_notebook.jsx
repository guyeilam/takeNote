import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NotebookDetailNote from './notebook_detail_note';
import { connect } from 'react-redux';
import { requestSingleNotebook } from '../../actions/notebook_actions';
import { setCurrentNote } from '../../actions/note_actions';

class NotesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteId: null,
      title: '',
      content: '',
      // notebookId: this.props.notebookId,
      // userId: this.props.currentUser.id
    }

    this.handleNoteClick = this.handleNoteClick.bind(this);
  }

  componentDidMount() {
    if (this.props.notebookId) {
      this.setState({ notebookId: this.props.notebookId });
    }
    this.props.requestSingleNotebook(this.props.notebookId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.notebook) {
      if ((this.props.notebook.noteIds.length > 0) && (this.state.noteId !== this.props.notebook.noteIds[0])) {
        this.setState({ 
          noteId: this.props.notebook.noteIds[0],
          title: this.props.notes[this.props.notebook.noteIds[0]].title,
          content: this.props.notes[this.props.notebook.noteIds[0]].content
        });
        this.props.setCurrentNote(this.props.notebook.noteIds[0]);
      }
    }
    // if ((!prevProps.currentNote && this.props.currentNote) || (this.props.currentNote && prevProps.currentNote && (this.props.currentNote.id !== prevProps.currentNote.id))) {
    
    // if ((!prevProps.currentNote && this.props.currentNote) || (this.props.currentNote && prevProps.currentNote && (this.props.currentNote !== prevProps.currentNote))) {
    //   this.setState({
    //     noteId: this.props.currentNote,
    //     title: this.props.notes[this.props.currentNote].title,
    //     content: this.props.notes[this.props.currentNote].content,
    //     userId: this.props.currentUser.id
    //   });
    // }
  }

  handleChange(field) {
    return (e) => {
      return this.setState({ [field]: e.currentTarget.value });
    }
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

  render() {
    if ((!this.props.notebook) || (Object.values(this.props.notebook).length === 0)) return null;

    const notebookId = this.props.notebookId;

    const notesArray = Object.values(this.props.notes);
    const noteItems = (notesArray.length > 0) ? notesArray.map((note) => {
      return (
        <NotebookDetailNote key={note.id} note={note} handleNoteClick={this.handleNoteClick} />
      );
    }) : null;

    return (
      <div className='notebook-detail-notes'>
        <div className='notebook-detail-notebook-title'>{this.props.notebook.title}</div>
        <div className='notebook-detail-notes-count'><p>{notesArray.length} notes</p></div>
        <ul className='notebook-detail-notes-list'>
          {noteItems}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    notebook: Object.values(state.entities.notebooks)[0],
    notes: state.entities.notes,
    notebookId: ownProps.match.params.notebookId
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestSingleNotebook: (notebookId) => dispatch(requestSingleNotebook(notebookId)),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesList));