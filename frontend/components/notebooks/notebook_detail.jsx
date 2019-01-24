import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

class NotebookDetail extends Component {
  componentDidMount() {
    this.props.requestSingleNotebook(this.props.match.params.notebookId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.notebookId !== this.props.match.params.notebookId) {
      this.props.requestSingleNotebook(this.props.match.params.notebookId);
    }
  }


  render() {
    if (!this.props.notebook) return null;
    return (
      <section className='notebook-detail'>
        <div>
          {this.props.notebook.title}
        </div>
      </section>
    );
  }
}

export default withRouter(NotebookDetail);