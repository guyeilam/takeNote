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
      if (this.props.notes) {
        if ((Object.values(this.props.notes).length > 0) && (prevProps.currentNote !== Object.values(this.props.notes)[0].id)) {
          const noteId = Object.values(this.props.notes)[Object.values(this.props.notes).length - 1].id;
          this.props.setCurrentNote(noteId);
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

    const notesArray = this.props.notebook.noteIds;
    const noteItems = (notesArray.length > 0) ? notesArray.map((noteId) => {
      return (
        <NotebookDetailNote key={noteId} note={this.props.notes[noteId]} handleNoteClick={this.handleNoteClick} />
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
  
  let sorted_notes = () => {
    let notes = Object.keys(state.entities.notes).map(id => state.entities.notes[id]);

    return notes.sort(function (a, b) {
      a = new Date(a.updated_at);
      b = new Date(b.updated_at);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }

  return ({
    notebook: state.entities.notebooks[ownProps.match.params.notebookId],
    notes: sorted_notes(),
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