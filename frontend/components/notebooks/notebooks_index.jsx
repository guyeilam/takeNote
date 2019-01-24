import React, { Component } from 'react';
import NotebooksIndexItem from './notebook_index_item';
import NotebookDetailContainer from './notebook_detail_container';
import { Route } from 'react-router-dom';

class NotebooksIndex extends Component {
  componentDidMount() {
    this.props.requestAllNotebooks();
  }

  render() {
    return (
      <section className='notebooks'>
        <div className='notebooks-list-container'>
          <div className='notebooks-list-header'>Notebooks</div>
          <div className='notebooks-list-menubar'>
            <div className='notebooks-list-menubar-header'>My notebook list</div>
          </div>
          <hr />
          <div className='notebooks-list-content'>
            <ul>
              {this.props.notebooks.map(notebook => <NotebooksIndexItem key={notebook.id} notebook={notebook} />)}
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

export default NotebooksIndex;