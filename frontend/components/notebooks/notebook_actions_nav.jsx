import React from 'react';

class NotebookActionsNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(notebookId) {
    return (e) => {
      this.props.deleteNotebookById(notebookId);
    }
  }
  
  render() {
    return (
      <>
        <div className='notebook-actions-nav-text'>
          <div className='notebook-actions-nav-delete'><button className='notebook-item-delete-button' onClick={this.handleDelete(this.props.notebookId)}>Delete notebook</button></div>
          <div className='notebook-actions-nav-rename'>Rename notebook...</div>
          <div className='notebook-actions-move-to'>Move to...</div>
        </div>
      </>
    );
  }
}

export default NotebookActionsNav;