import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import NavModal from '../modal/nav_modal';
import NotebookNoteListItem from './notebook_note_list_item';

class NotebooksIndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotes: false
    }
  }

  render() {
    
    const { notebook, deleteNotebook, openActionsModal } = this.props;

    const noteTitles = notebook.note_titles ? Object.values(notebook.note_titles) : [];
    const noteItems = this.state.showNotes ? noteTitles.map(note => {
      return (
        <NotebookNoteListItem key={note.id} note={note} />
      ); }) : null;

    return (
      <>
        <li className='notebooks-index-item'>
          <div className='notebooks-index-item-hover'>
            <span className='notebook-item-expand'><button onClick={() => this.setState({ showNotes: !this.state.showNotes })}><i className="fas fa-caret-right" /></button></span>
            <span className='notebook-item-icon'><i className="fas fa-book" /></span>
            <span className='notebook-item-title'><Link to={`/notebooks/${notebook.id}`}>{notebook.title} ({noteTitles.length})</Link></span>
            <span className='notebook-item-created-by'>- </span>
            <span className='notebook-item-updated'>{notebook.updated_at}</span>
            <span className='notebook-item-shared-with'>- </span>
            <span className='notebook-item-actions'>
              <NavModal modalId={notebook.id}/>
              <button className='notebook-item-delete-button' onClick={openActionsModal(notebook.id)}>Actions</button>
              {/* <button className='notebook-item-delete-button' onClick={deleteNotebook(notebook)}>Delete</button> */}
            </span>
          </div>
          <ul className='notebook-item-notes-detail'>
            {noteItems}
          </ul>
        </li>
        
        
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  
  return ({
    notebook: ownProps.notebook,
    deleteNotebook: ownProps.deleteNotebook,
    openActionsModal: ownProps.openActionsModal
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({

  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebooksIndexItem);