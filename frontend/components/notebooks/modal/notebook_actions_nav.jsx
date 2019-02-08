import React from 'react';

class NotebookActionsNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRenameNotebook = this.handleRenameNotebook.bind(this);
  }

  handleDelete(notebookId) {
    return (e) => {
      this.props.closeNavModal();
      this.props.deleteNotebookById(notebookId);
    }
  }
  
  handleRenameNotebook() {
    return (e) => {
      this.props.closeNavModal();
      this.props.openModal('rename-notebook', this.props.notebookId);
    }
  }

  render() {
    const activeDeleteButton = (this.props.notebookId !== this.props.defaultNotebookId) ? <div className='notebook-actions-nav-delete'><button className='notebook-item-delete-button' onClick={this.handleDelete(this.props.notebookId)}>Delete notebook</button></div> : '';

    return (
      <>
        <div className='notebook-actions-nav-text'>
          {activeDeleteButton}          
          <div className='notebook-actions-nav-rename'><button onClick={this.handleRenameNotebook()}>Rename notebook...</button></div>
          <div className='notebook-actions-move-to'>Move to...</div>
        </div>
      </>
    );
  }
}

export default NotebookActionsNav;