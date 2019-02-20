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
      this.props.deleteNotebookById(notebookId).then(() => this.props.requestAllNotebooks());
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
    const activeDeleteButton = (this.props.notebookId !== this.props.defaultNotebookId) ? <div className='notebook-actions-nav-delete' onClick={this.handleDelete(this.props.notebookId)}><div className='notebook-item-delete'>Delete notebook</div></div> : '';
    const activeDefaultNotebookButton = (this.props.notebookId !== this.props.defaultNotebookId) ? <div className='notebook-actions-nav-default-notebook' onClick={this.handleUpdateDefaultNotebook(this.props.notebookId)}><div className='notebook-item-default'>Make default notebook...</div></div> : '';
    return (
      <>
        <div className='notebook-actions-nav-text'>
          {activeDeleteButton}          
          <div className='notebook-actions-nav-rename' onClick={this.handleRenameNotebook()}><div className='notebook-item-rename'>Rename notebook...</div></div>
          {activeDefaultNotebookButton}
        </div>
      </>
    );
  }
}

export default NotebookActionsNav;