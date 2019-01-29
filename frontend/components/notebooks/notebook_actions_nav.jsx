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
        <div>Notebook Actions Nav</div>
        <div><button className='notebook-item-delete-button' onClick={this.handleDelete(this.props.notebookId)}>Delete</button></div>
      </>
    );
  }
}

export default NotebookActionsNav;