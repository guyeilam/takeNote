import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ViewAllNotes from './view_all_notes';
import SingleNotebookContainer from './single_notebook_container';
import AllNotesContainer from './all_notes_container';
import FilterTagContainer from './filter_tag_container';
import EditNote from './edit_note';

class ViewNotebook extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className='notebook-detail'>
        <div className='notebook-detail-notes-spacer'></div>

        <div className='notebook-detail-notes-container'>
          <Route exact
            path="/notebooks/:notebookId"
            component={SingleNotebookContainer}
          />
          <Route exact
            path="/notes/all"
            component={AllNotesContainer}
          />
          {/* <Route exact
            path="/notes/:noteId"
            component={ViewAllNotes}
          /> */}
          <Route exact
            path="/tags/:tagId"
            component={FilterTagContainer}
          />
          <EditNote />
        </div>
        
      </section>
    );
  }
}

export default withRouter(ViewNotebook);