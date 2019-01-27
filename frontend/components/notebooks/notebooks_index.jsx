import React, { Component } from 'react';
import NotebooksIndexItem from './notebook_index_item';
import NotebookDetailContainer from './notebook_detail_container';
import { Route } from 'react-router-dom';
import Modal from '../modal/modal';

class NotebooksIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: this.props.sort
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  
  componentDidMount() {
    this.props.requestAllNotebooks();
    // this.props.sortToggle(true);
  }

  handleDelete(notebook) {
    // e.preventDefault();
    return (e) => {
      this.props.deleteNotebook(notebook);
    }
  }

  handleSort(sortOption) {
    return (e) => {
      this.setState({ sorted: sortOption });
      // this.props.sortToggle(sortOption);
    }
  }

  render() {
    const sortOption = this.state.sorted ? 'sorted-reverse' : 'sorted-normal';
    return (
      <>
        <Modal />
        <section className='notebooks'>
          <div className='notebooks-list-container'>
            <div className='notebooks-list-header'>Notebooks</div>
            <div className='notebooks-list-menubar'>
              <div className='notebooks-list-menubar-header'>My notebook list</div>
              <div className='notebooks-list-menubar-new-notebook-button button'><i className="fas fa-user-plus" /><button onClick={() => this.props.openModal('new-notebook')}>New Notebook</button></div>
              <div className='notebooks-list-menubar-sort-button'><button onClick={this.handleSort(!this.state.sorted)}><i className="fas fa-sort-amount-down"/></button></div>
            </div>
            <ul className='notebooks-list-table-header'>
              <li><button onClick={this.handleSort(!this.state.sorted)}>Title</button></li>
              <li>Created By</li>
              <li>Updated</li>
              <li>Shared With</li>
              <li>Actions</li>
            </ul>
            <div className='notebooks-list-content'>
              <ul className={`notebooks-list-content-ul ${sortOption}`}>
                {this.props.notebooks.map(notebook => <NotebooksIndexItem key={notebook.id} notebook={notebook} deleteNotebook={this.handleDelete}/>)}
              </ul>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default NotebooksIndex;