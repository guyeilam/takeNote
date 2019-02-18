import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavModal from '../modal/nav_modal';
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
    if (!this.props.currentNote) { return null; }
    
    return (
      <div className='note-header'>


        <div className='note-actions-icon' onClick={() => this.openModal()}><svg width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></div>
        <NavModal modalId={this.props.currentNote}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    currentNote: state.ui.currentNote
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteHeader);

