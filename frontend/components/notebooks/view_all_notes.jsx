import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NotebookDetailNote from './notebook_detail_note';
import { connect } from 'react-redux';
import { requestAllNotebooks } from '../../actions/notebook_actions';
import { setCurrentNote } from '../../actions/note_actions';

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.handleNoteClick = this.handleNoteClick.bind(this);
  }

  componentDidMount() {
    this.props.requestAllNotebooks();
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
    if ((!this.props.notes) || (Object.values(this.props.notes).length === 0)) return null;

    const notebookTitle = 'All Notes';

    const notesArray = Object.values(this.props.notes);
    const noteItems = (notesArray.length > 0) ? notesArray.map((note) => {
      return (
        <NotebookDetailNote key={note.id} note={note} handleNoteClick={this.handleNoteClick} />
      );
    }) : null;

    return (
      <div className='notebook-detail-notes'>
        <div className='notebook-detail-notebook-title'>{notebookTitle}</div>
        <div className='notebook-detail-notes-count'><p>{notesArray.length} notes</p></div>
        <ul className='notebook-detail-notes-list'>
          {noteItems}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    notes: state.entities.notes,
    currentNote: state.ui.currentNote
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesList));