import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NotebookDetailNote from './notebook_detail_note';
import { connect } from 'react-redux';
import { requestAllNotebooks } from '../../actions/notebook_actions';

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
    this.props.requestAllNotebooks();
  }

  componentDidUpdate(prevProps) {
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
    // if ((!this.props.notebooks) || (Object.values(this.props.notebooks).length === 0)) return null;



    // if () {
    //   notebookTitle = 'All Notes';
    // }

    const notebookTitle = this.props.notebookId ? this.props.notebooks.title : 'All Notes';
    // let notebook;
    // let notebookNotes;
    const notebookId = this.props.notebookId;

    const notesArray = Object.values(this.props.notes);
    const noteItems = (notesArray.length > 0) ? notesArray.map((note) => {
      return (
        <NotebookDetailNote key={note.id} note={note} handleNoteClick={this.handleNoteClick} />
      );
    }) : null;

    // notebookId = this.props.notebookId;
    // notebook = this.props.notebooks[notebookId];

    // if (notebook.noteIds) {
    //   notes = notebook.noteIds.map(id => this.state.entities.notes[id]);
    //   notebookTitle = this.props.notebooks.title;
    // }


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
    notes: state.entities.notes
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks())
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesList));