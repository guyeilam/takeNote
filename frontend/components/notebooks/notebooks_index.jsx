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
        {/* <Route
          path="/notebooks/:notebookId"
          component={NotebookDetailContainer}
        /> */}
        <ul>
          {this.props.notebooks.map(notebook => <NotebooksIndexItem key={notebook.id} notebook={notebook} />)}
        </ul>
      </section>
    )
  }
}

export default NotebooksIndex;