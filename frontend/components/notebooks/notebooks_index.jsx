import React, { Component } from 'react';
import NotebooksIndexItem from './notebook_index_item';

class NotebooksIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: this.props.sort
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  componentDidMount() {
    this.props.requestAllNotebooks();
  }

  handleDelete(notebook) {
    return (e) => {
      this.props.deleteNotebook(notebook);
    }
  }

  handleSort(sortOption) {
    return (e) => {
      this.setState({ sorted: sortOption });
    }
  }

  handleModalClick(navModalId) {
    return (e) => {
      e.preventDefault();
      this.props.openNavModal('notebook-actions-nav', navModalId);
    }
  }

  render() {
    if (!this.props.notebooks) { return null; }
    if (this.props.notebooks.id) { return null; }

    const sortOption = this.state.sorted ? 'sorted-reverse' : 'sorted-normal';
    const notebooks = Object.values(this.props.notebooks);
    return (
      <>
          <div className='notebooks-list-container'>
            <div className='notebooks-list-header'>Notebooks</div>
            <div className='notebooks-list-menubar'>
              <div className='notebooks-list-menubar-header'>My notebook list</div>
              <div className='notebooks-list-menubar-new-notebook-button button'><i className="fas fa-user-plus" /><button onClick={() => this.props.openModal('new-notebook')}>New Notebook</button></div>
              <div className='notebooks-list-menubar-sort-button'><button onClick={this.handleSort(!this.state.sorted)}><i className="fas fa-sort-amount-down" /></button></div>
            </div>

            <div className='notebooks-list-table-header'>
              <div className='col1'>Title</div>
              <div className='col2'>Created By</div>
              <div className='col3'>Updated</div>
              <div className='col4'>Shared With</div>
              <div className='col5'>Actions</div>
            </div>

            <div className={`notebooks-list-content-ul ${sortOption}`}>
              {notebooks.map((notebook, idx) => <NotebooksIndexItem key={idx} idx={idx} notebook={notebook} deleteNotebook={this.handleDelete} openActionsModal={(navModalId) => this.handleModalClick(navModalId)} />)}
            </div>
          </div>
      </>
    );
  }
}

export default NotebooksIndex;