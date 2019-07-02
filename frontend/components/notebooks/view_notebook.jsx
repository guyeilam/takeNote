import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";

import SingleNotebookContainer from "./single_notebook_container";
import AllNotesContainer from "./all_notes_container";
import FilterTagContainer from "./filter_tag_container";
import EditNote from "./edit_note";
import SearchContainer from "../search/search_container";
import SharedNotesContainer from "./shared_notes_container";

const ViewNotebook = () => {
  return (
    <section className="notebook-detail">
      <div className="notebook-detail-notes-spacer" />

      <div className="notebook-detail-notes-container">
        <Route
          exact
          path="/notebooks/:notebookId"
          component={SingleNotebookContainer}
        />
        <Route exact path="/notes/all" component={AllNotesContainer} />
        <Route exact path="/search" component={SearchContainer} />
        <Route exact path="/tags/:tagId" component={FilterTagContainer} />
        <Route exact path="/shared_notes" component={SharedNotesContainer} />
        <EditNote />
      </div>
    </section>
  );
};

export default withRouter(ViewNotebook);
