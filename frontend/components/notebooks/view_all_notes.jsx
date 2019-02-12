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
        if ((this.props.notes.length > 0) && (prevProps.currentNote !== this.props.notes[0].id)) {
          this.props.setCurrentNote(this.props.notes[0].id);
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
    if (!this.props.notes) { return null }

    const notebookTitle = 'All Notes';

    const noteItems = (this.props.notes.length > 0) ? this.props.notes.map((note) => {
      return (
        <NotebookDetailNote key={note.id} note={note} handleNoteClick={this.handleNoteClick} />
      );
    }) : <div className='empty-notes-message'>
      <div className='empty-notes-subheader'>Create your first note!</div>
      <div className='empty-notes-text'>Click the + New Note button in the sidebar to get started.</div>
      </div>;

    return (
      <div className='notebook-detail-notes'>
        <div className='notebook-detail-notebook-title'>{notebookTitle}</div>
        <div className='notebook-detail-notes-count'><p>{this.props.notes.length} notes</p></div>
        <ul className='notebook-detail-notes-list'>
          {noteItems}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {

  let sorted_notes = () => {
    let notes = Object.keys(state.entities.notes).map(id => state.entities.notes[id]);

    return notes.sort(function (a, b) {
      a = new Date(a.updated_at);
      b = new Date(b.updated_at);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }
  
  return ({
    notes: sorted_notes(),
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