import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LeftNavBar from '../left_nav_bar/left_nav_bar';
import NoteEditContainer from '../notes/note_edit_container';

class NotebookDetail extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.requestSingleNotebook(this.props.match.params.notebookId);
  }

  render() {
    if (!this.props.notebook) return null;
    const noteId = 132;
    return (
      <section className='notebook-detail'>
        <div className='left-navbar'>
          <LeftNavBar currentUser={this.props.currentUser} />
        </div>
        <div className='left-navbar-spacer'></div>
        <div className='notebook-detail-notes-container'>
          <div className='notebook-detail-notes'>
            <div className='notebook-detail-notebook-title'>{this.props.notebook.title}</div>
            <div className='notebook-detail-notes-count'><p>{this.props.notes.length} notes</p></div>
            <ul className='notebook-detail-notes-list'>
              {this.props.notes.map(note => <li key={note.id}>{note.title}</li>)}
            </ul>
          </div>
          <div className='note-edit'>
            <NoteEditContainer note={noteId}/>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(NotebookDetail);