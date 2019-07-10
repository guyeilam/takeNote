import React from "react";
import Modal from "../modal/modal";
import LeftNavBar from "../left_nav_bar/left_nav_bar";
import ViewNotebookContainer from "../notebooks/view_notebook";
import { Route, withRouter } from "react-router-dom";
import TagsList from "../tags/tags_index";
import LeftNavModal from "../left_nav_bar/left_nav_modal";
import NotebooksIndex from "../notebooks/notebooks_index";

const Client = () => {
  return (
    <>
      <Modal />
      <LeftNavModal modalId={null} />

      <section className="notebooks">
        <div className="left-navbar">
          <LeftNavBar />
        </div>

        <div className="left-navbar-spacer" />

        <Route exact path="/client" component={NotebooksIndex} />
        <Route
          exact
          path="/notebooks/:notebookId"
          component={ViewNotebookContainer}
        />
        <Route exact path="/notes/all" component={ViewNotebookContainer} />
        <Route exact path="/tags/:tagId" component={ViewNotebookContainer} />
        <Route exact path="/tags" component={TagsList} />
        <Route exact path="/search" component={ViewNotebookContainer} />
        <Route exact path="/shared_notes" component={ViewNotebookContainer} />
      </section>
    </>
  );
};

export default withRouter(Client);
