import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NotebookDetailNote from './notebook_detail_note';
import { connect } from 'react-redux';
import { requestSingleNotebook } from '../../actions/notebook_actions';
import { setCurrentNote } from '../../actions/note_actions';

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.handleNoteClick = this.handleNoteClick.bind(this);
  }

  componentDidMount() {
    this.props.requestSingleNotebook(this.props.notebookId);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.currentNote) {
      if (this.props.notebook) {
        if ((this.props.notebook.noteIds.length > 0) && (prevProps.currentNote !== this.props.notebook.noteIds[0])) {
          this.props.setCurrentNote(this.props.notebook.noteIds[0]);
        }
      }
    }
  }
  
  componentWillUnmount() {
    this.props.setCurrentNote(null);
  }

  handleNoteClick(note) {
    return () => {
      this.props.setCurrentNote(null);
      this.props.setCurrentNote(note.id);
    }
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
    notebook: state.entities.notebooks[ownProps.match.params.notebookId],
    notes: state.entities.notes,
    notebookId: ownProps.match.params.notebookId,
    currentNote: state.ui.currentNote
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestSingleNotebook: (notebookId) => dispatch(requestSingleNotebook(notebookId)),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesList));