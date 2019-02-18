import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeNavModal } from '../../actions/modal_actions';

class TaggingModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className='tag-actions-nav-text'>
          <div className='tagging-filter-by-tag'><div className='taggings-modal-button-text'>Filter by Tag</div></div>
          <div className='tagging-remove'><div className='taggings-modal-button-text'>Remove</div></div>
          <div className='tagging-hr'></div>
          <div className='tagging-remove-from-all'><div className='taggings-modal-button-text'>Delete from All Notes</div></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tag: ownProps.tag,
    showModalId: ownProps.showModalId
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaggingModal);