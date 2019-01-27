import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

class NotebookDetail extends Component {
  constructor(props) {
    super(props);
    // GET NOTES USING SELECTOR
  }
  componentDidMount() {
    this.props.requestSingleNotebook(this.props.match.params.notebookId);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.match.params.notebookId !== this.props.match.params.notebookId) {
  //     this.props.requestSingleNotebook(this.props.match.params.notebookId);
  //   }
  // }


  render() {
    // if (!this.props.notebook) return null;
    return (
      <section className='notebook-detail'>
        <div className='notebook-detail-notes'>
          <div className='notebook-detail-notebook-title'>{this.props.notebook.title}</div>
          <ul className='notebook-detail-notes-list'>
            {/* {this.props.notebook.map(notebook => <NotebooksIndexItem key={notebook.id} notebook={notebook} */}
          </ul>
        </div>
      </section>
    );
  }
}

export default withRouter(NotebookDetail);