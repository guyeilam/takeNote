import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import NavModal from '../modal/nav_modal';
import NotebookNoteListItem from './notebook_note_list_item';
import { formatDateTime } from '../../util/datetime_util';

class NotebooksIndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotes: false
    }
    this.rowSelector = this.rowSelector.bind(this);
  }

  rowSelector(idx) {
    if (idx % 2 === 0) {
      return 'even-row';
    } else {
      return 'odd-row';
    }
  }

  render() {
    
    const { notebook, deleteNotebook, openActionsModal } = this.props;

    const noteTitles = notebook.note_titles ? Object.values(notebook.note_titles) : [];
    const noteItems = this.state.showNotes ? noteTitles.map((note, idx) => {
      return (
        <NotebookNoteListItem key={idx} idx={idx} note={note} rowSelector={this.rowSelector} />
      ); }) : null;
    
    return (
      <>
        <div className={`notebooks-index-item-hover ${this.rowSelector(this.props.idx)}`}>
          <div className='notebooks-item-col1 col1'>
            <div className='notebook-item-expand'><button onClick={() => this.setState({ showNotes: !this.state.showNotes })}><i className="fas fa-caret-right" /></button></div>
            <div className='notebook-item-icon'><i className="fas fa-book" /></div>
            <div className='notebook-item-title'><Link to={`/notebooks/${notebook.id}`}>{notebook.title} ({noteTitles.length})</Link></div>
          </div>
          
          <div className='notebooks-item-col2 col2'>
            <div className='notebook-item-created-by'>- </div>
          </div>
          
          <div className='notebooks-item-col3 col3'>
            <div className='notebook-item-updated'>{formatDateTime(notebook.updated_at)}</div>
          </div>
          
          <div className='notebooks-item-col4 col4'>
            <div className='notebook-item-shared-with'>- </div>
          </div>

          <div className='notebooks-item-col5 col5'>
            <div className='notebook-item-actions'>
              <NavModal modalId={notebook.id}/>
              <button className='notebook-item-delete-button' onClick={openActionsModal(notebook.id)}>Actions</button>
              {/* <button className='notebook-item-delete-button' onClick={deleteNotebook(notebook)}>Delete</button> */}
            </div>
          </div>
        </div>
        <section className='notebooks-index-item-notes'>
          {noteItems}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return ({
    notebook: ownProps.notebook,
    // notebook: Object.values(state.entities.notebooks),
    deleteNotebook: ownProps.deleteNotebook,
    openActionsModal: ownProps.openActionsModal
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({

  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebooksIndexItem));