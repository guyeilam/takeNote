import React, { Component } from 'react';
import NotebooksIndexItem from './notebook_index_item';
import NotebookDetailContainer from './notebook_detail_container';
import { Route } from 'react-router-dom';
import Modal from '../modal/modal';

class NotebooksIndex extends Component {
  componentDidMount() {
    this.props.requestAllNotebooks();
  }

  render() {
    return (
      <>
        <Modal />
        <section className='notebooks'>
          <div className='notebooks-list-container'>
            <div className='notebooks-list-header'>Notebooks</div>
            <div className='notebooks-list-menubar'>
              <div className='notebooks-list-menubar-header'>My notebook list</div>
              <div className='notebooks-list-menubar-new-notebook-button button'><i className="fas fa-user-plus" /><button onClick={() => this.props.openModal('new-notebook')}>New Notebook</button></div>
              <div className='notebooks-list-menubar-sort-button'><i className="fas fa-sort-amount-down"/></div>
            </div>
            <ul className='notebooks-list-table-header'>
              <li>Title</li>
              <li>Created By</li>
              <li>Updated</li>
              <li>Shared With</li>
              <li>Actions</li>
            </ul>
            <div className='notebooks-list-content'>
              <ul className='notebooks-list-content-ul'>
                {this.props.notebooks.map(notebook => <NotebooksIndexItem key={notebook.id} notebook={notebook} />)}
              </ul>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default NotebooksIndex;