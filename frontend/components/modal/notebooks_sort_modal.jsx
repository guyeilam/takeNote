import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeNavModal } from '../../actions/modal_actions';
import { setSort } from '../../actions/ui_actions';
import { requestAllNotebooks } from '../../actions/notebook_actions';


class NotebooksSortModal extends Component {
  constructor(props) {
    super(props);
    this.setSort = this.setSort.bind(this);
  }

  setSort(sortMethod) {
    // this.props.setSort('title_descending');
    return () => {
      // this.props.setSort();
      this.props.setSort(sortMethod);
      this.props.closeNavModal();
      // this.props.requestAllNotebooks();
    }
    
    // this.props.setSort(sortMethod);
    
  }

  render() {
    return (
      <>
        <div className='notebooks-sort-modal-text'>
          <div className='sort-by-text notebooks-sort-modal-button-text'>Sort By...</div>
          <div className='notebooks-sort-modal-button-text-updated-descending notebooks-sort-modal-button' onClick={this.setSort('updated_date_descending')}><div className='notebooks-sort-modal-button-text'>Date Updated: Most to least recent</div></div>
            <div className='notebooks-sort-modal-button-text-updated-ascending notebooks-sort-modal-button' onClick={this.setSort('updated_date_ascending')}><div className='notebooks-sort-modal-button-text'>Date Updated: Least to most recent</div></div>
          <div className='notebooks-sort-modal-button-text-created-descending notebooks-sort-modal-button' onClick={this.setSort('created_date_descending')}><div className='notebooks-sort-modal-button-text'>Date Created: Most to least recent</div></div>
          <div className='notebooks-sort-modal-button-text-created-ascending notebooks-sort-modal-button' onClick={this.setSort('created_date_ascending')}><div className='notebooks-sort-modal-button-text'>Date Created: Least to most recent</div></div>
          <div className='notebooks-sort-modal-button-text-title-ascending notebooks-sort-modal-button' onClick={this.setSort('title_ascending')}><div className='notebooks-sort-modal-button-text'>Title: A to Z</div></div>
          <div className='notebooks-sort-modal-button-text-title-descending notebooks-sort-modal-button' onClick={this.setSort('title_descending')}><div className='notebooks-sort-modal-button-text'>Title: Z to A</div></div>
          </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navModalId: state.ui.navModalId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeNavModal: () => dispatch(closeNavModal()),
    setSort: sortMethod => dispatch(setSort(sortMethod)),
    requestAllNotebooks: () => dispatch(requestAllNotebooks())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebooksSortModal));