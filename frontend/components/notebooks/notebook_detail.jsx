import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
// import { selectNotebookNotes } from '../../reducers/selectors';

class NotebookDetail extends Component {
  constructor(props) {
    super(props);
    // GET NOTES USING SELECTOR
  }
  componentDidMount() {
    this.props.requestSingleNotebook(this.props.match.params.notebookId);
    // selectNotebookNotes(this.state, this.props.notebook);
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
            {this.props.notes.map(note => <li key={note.id}>{note.title}</li>)}
          </ul>
        </div>
      </section>
    );
  }
}

export default withRouter(NotebookDetail);