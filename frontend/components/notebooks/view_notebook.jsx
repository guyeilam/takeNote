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
    // this.props.requestAllNotebooks();
  }


  render() {
    // if ((!this.props.notebooks) || (Object.values(this.props.notebooks).length === 0)) return null;
    
    // const notebookTitle = this.props.notebookId ? this.props.notebooks.title : 'All Notes';
    // const notebookId = this.props.notebookId;
    
    // const notesArray = Object.values(this.props.notes);

    return (
      <section className='notebook-detail'>
        <div className='notebook-detail-notes-container'>
          <Route exact
            path="/notebooks/:notebookId"
            component={ViewSingleNotebook}
          />
          <Route exact
            path="/notes/all"
            component={ViewAllNotes}
          />
          <EditNote />
        </div>
      </section>
    );
  }
}

export default withRouter(ViewNotebook);