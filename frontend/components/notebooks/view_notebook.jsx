import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ViewAllNotes from './view_all_notes';
import ViewSingleNotebook from './view_single_notebook';
import EditNote from './edit_note';
import { Route } from 'react-router-dom';

class ViewNotebook extends Component {
  constructor(props) {
    super(props);
  }
  
   componentDidMount() {
    if (this.props.notebookId) {
      this.setState({ notebookId: this.props.notebookId });
    }
  }

  render() {
    return (
      <section className='notebook-detail'>
        <div className='notebook-detail-notes-spacer'></div>

        <div className='notebook-detail-notes-container'>
          <Route exact
            path="/notebooks/:notebookId"
            component={ViewAllNotes}
          />
          <Route exact
            path="/notes/all"
            component={ViewAllNotes}
          />
          <Route exact
            path="/tags/:tagId"
            component={ViewAllNotes}
          />
          <EditNote />
        </div>
        
      </section>
    );
  }
}

export default withRouter(ViewNotebook);