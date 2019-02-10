import React from 'react';

class NotebookActionsNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRenameNotebook = this.handleRenameNotebook.bind(this);
    this.handleUpdateDefaultNotebook = this.handleUpdateDefaultNotebook.bind(this);
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

  handleUpdateDefaultNotebook(notebookId) {
    return (e) => {
      this.props.closeNavModal();
      this.props.updateDefaultNotebook(notebookId);
    }
  }

  render() {
    const activeDeleteButton = (this.props.notebookId !== this.props.defaultNotebookId) ? <div className='notebook-actions-nav-delete'><button className='notebook-item-delete-button' onClick={this.handleDelete(this.props.notebookId)}>Delete notebook</button></div> : '';
    const activeDefaultNotebookButton = (this.props.notebookId !== this.props.defaultNotebookId) ? <div className='notebook-actions-nav-default-notebook'><button onClick={this.handleUpdateDefaultNotebook(this.props.notebookId)}>Make default notebook...</button></div> : '';
    return (
      <>
        <div className='notebook-actions-nav-text'>
          {activeDeleteButton}          
          <div className='notebook-actions-nav-rename'><button onClick={this.handleRenameNotebook()}>Rename notebook...</button></div>
          {activeDefaultNotebookButton}
        </div>
      </>
    );
  }
}

export default NotebookActionsNav;