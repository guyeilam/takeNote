import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavModal from '../modal/nav_modal';
import { Link } from 'react-router-dom';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';

class NoteHeader extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.props.openNavModal('note-header-nav', this.props.currentNote);
  }

  render() {
    if (!this.props.currentNote || !this.props.notes || !this.props.notebooks || (Object.values(this.props.notes).length === 0)) { return null; }
    
    const noteNotebook = (this.props.notes && this.props.notebooks && this.props.currentNote) ? this.props.notebooks[this.props.notes[this.props.currentNote].notebook_id] : null;

    return (
      <div className='note-header'>
        <div className='current-notebook'>
          <div className='current-notebook-icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="#000" fillRule="nonzero" d="M3 2v10h7a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zM2 1h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2V1zm2 1v10h1V2H4zm2 3v1h4V5H6z"></path></svg>
          </div>
          <div className='current-notebook-title'><Link to={`/notebooks/${noteNotebook.id}`}>{noteNotebook.title}</Link></div>
        </div>

        <div className='note-actions-menu'>
          <NavModal modalId={this.props.currentNote}/>
          <div className='note-actions-icon' onClick={() => this.openModal()}><svg width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  
  return ({
    currentNote: state.ui.currentNote,
    notes: state.entities.notes,
    notebooks: state.entities.notebooks
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteHeader);

