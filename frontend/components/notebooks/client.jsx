import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../modal/modal';
import LeftNavBar from '../left_nav_bar/left_nav_bar';
import NotebooksIndexContainer from './notebooks_index_container';
import ViewNotebookContainer from './view_notebook_container';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import TagsList from '../tags/tags_index';

class Client extends Component {
  render () {
    return (
      <>
        <Modal />

        <section className='notebooks'>

          <div className='left-navbar'>
            <LeftNavBar />
          </div>

          <div className='left-navbar-spacer'></div>
          
          <Route exact
            path="/client"
            component={NotebooksIndexContainer}
          />
          <Route exact
            path="/notebooks/:notebookId"
            component={ViewNotebookContainer}
          />
          <Route exact
            path="/notes/all"
            component={ViewNotebookContainer}
          />
          <Route exact
            path="/tags/:tagId"
            component={ViewNotebookContainer}
          />
          <Route exact
            path="/tags"
            component={TagsList}
          />

        </section>
      </>
    );
  }
}

const mapStateToProps = state => {
  return ({

  });
}

const mapDispatchToProps = dispatch => {
  return ({

  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Client));