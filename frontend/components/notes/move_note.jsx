import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { withRouter } from 'react-router-dom';

class MoveNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newNotebookId: this.props.notes[this.props.noteId].notebook_id,
    }
    this.selectNotebook = this.selectNotebook.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.requestAllNotebooks();
  }

  selectNotebook(notebookId) {
    this.setState({ newNotebookId: notebookId });
  }

  handleSubmit(e) {
    e.preventDefault();
    let note;
    if (this.state.newNotebookId !== this.props.notes[this.props.noteId].notebook_id) {
      note = Object.assign({}, { id: this.props.noteId, notebook_id: this.state.newNotebookId });
      this.props.updateNote(note);
    }
    if (this.props.match.path === '/notebooks/:notebookId') {
      this.props.setCurrentNote(null);
    }
    this.props.closeModal();
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const notebooks = this.props.notebooks ? Object.keys(this.props.notebooks).map(notebookId => this.props.notebooks[notebookId]) : null;
    
    const notebookItems = notebooks ? notebooks.map((notebook, idx) => {
      return (
        <div className={`move-note-notebook-item ${(this.state.newNotebookId === notebook.id) ? 'selected' : ''} `} key={idx} onClick={() => this.selectNotebook(notebook.id)}>
          <div className={`move-note-checkbox ${(this.state.newNotebookId === notebook.id) ? 'selected' : ''} `}><i className="fas fa-check"></i></div>
          <div className='move-note-notebook-icon'><svg className='notebook-icon-svg' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs></defs><path className="cls-1" d="M16 8.33c0-.18-.22-.33-.5-.33h-4c-.28 0-.5.15-.5.33v1.34c0 .18.22.33.5.33h4c.28 0 .5-.15.5-.33zM18 6v11a2 2 0 0 1-2 2H9V4h7a2 2 0 0 1 2 2zM6 4h2v15H6z"></path></svg></div>
          <div className='move-note-notebook-title'>{notebook.title}</div>
        </div>
      )
    }) : null;
    
    return (
      <div className='move-note-container'>
        <form onSubmit={this.handleSubmit} className="move-note-form">
          <div className='form-header-and-content'>
                <div className='new-notebook-form-header'>
                  <div className='move-note-header-text'>Move note to...</div>
                  <div onClick={this.props.closeModal} className="close-x">X</div>
                </div>

                <div className="new-notebook-form-content">
                  <div className='move-note-notebooks-list'>
                    {notebookItems}
                  </div>
                </div>
            
          </div>

            <div className='form-errors-and-buttons'>
              <div className='new-notebook-form-errors'>{this.renderErrors()}</div>
              <div className='new-notebook-form-buttons'>
                <div onClick={this.props.closeModal} className='white-cancel-button'>Cancel</div>
                <input className="white-new-notebook-continue-button" type="submit" value='Move'/>
              </div>
            </div>
        </form>
      </div>
    );
  }
}

export default withRouter(MoveNote);