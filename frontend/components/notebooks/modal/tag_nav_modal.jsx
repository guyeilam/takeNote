import { connect } from 'react-redux';
import React, { Component } from 'react';
import { closeNavModal } from '../../../actions/modal_actions';
import { openModal } from '../../../actions/modal_actions';
import { deleteTag, updateTag } from '../../../actions/tag_actions';

class TagActions extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRename = this.handleRename.bind(this);
  }

  handleDelete(tag) {
    return (e) => {
      this.props.closeNavModal();
      this.props.deleteTag(tag);
    }
  }

  handleRename() {
    return (e) => {
      this.props.closeNavModal();
      this.props.openModal('rename-tag', this.props.tagId);
    }
  }

  render() {
    return (
      <>
        <div className='tag-actions-nav-text'>
          <div className='tag-actions-nav-delete' onClick={this.handleDelete(this.props.tag)}><div className='tag-actions-nav-button-text'>Delete tag...</div></div>
          <div className='tag-actions-nav-rename' onClick={this.handleRename()}><div className='tag-actions-nav-button-text'>Rename Tag...</div></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.session,
    tagId: ownProps.tagId,
    tag: state.entities.tags[ownProps.tagId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeNavModal: () => dispatch(closeNavModal()),
    openModal: (modal, tagId) => dispatch(openModal(modal, tagId)),
    deleteTag: (tag) => dispatch(deleteTag(tag)),
    updateTag: (tag) => dispatch(updateTag(tag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagActions);