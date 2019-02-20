import React, { Component } from 'react';
import NotebooksIndexItem from './notebook_index_item';
import NavModal from '../modal/nav_modal';

class NotebooksIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    // this.handleSort = this.handleSort.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  componentDidMount() {
    this.props.requestAllNotebooks();
  }

  handleDelete(notebook) {
    return (e) => {
      this.props.deleteNotebook(notebook).then(() => this.props.requestAllNotebooks());
    }
  }

  // handleSort(sortOption) {
  //   return (e) => {
  //     this.setState({ sorted: sortOption });
  //   }
  // }

  handleModalClick(navModalId) {
    return (e) => {
      e.preventDefault();
      this.props.openNavModal('notebook-actions-nav', navModalId);
    }
  }

  render() {
    if (!this.props.notebooks) { return null; }

    // const sortOption = this.state.sorted ? 'sorted-reverse' : 'sorted-normal';
    const notebooks = this.props.notebooks;

    return (
      <>
          <div className='notebooks-list-container'>
            <div className='notebooks-list-header'>Notebooks</div>
            <div className='notebooks-list-menubar'>
              <div className='notebooks-list-menubar-header'>My notebook list</div>
                <div className='new-notebook-notebooks-index-header'>
                  <div className='notebooks-list-menubar-new-notebook-button' onClick={() => this.props.openModal('new-notebook')}>
                    <div className='new-notebook-button-icon'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#00a82d" fillRule="nonzero" d="M19 17v-2h2v2h2v2h-2v2h-2v-2h-2v-2h2zm-1-2.874a4.002 4.002 0 0 0-2.952 4.497H9V4h7c1.105 0 2 .873 2 1.95v8.176zM6 4h2v14.623H6V4zm9.5 4h-4c-.276 0-.5.15-.5.333v1.334c0 .184.224.333.5.333h4c.276 0 .5-.15.5-.333V8.333C16 8.15 15.776 8 15.5 8z"></path></svg></div>
                    <div className='new-notebook-button-text'>New Notebook</div>
                  </div>
              <NavModal modalId={0} />
                <div className='notebooks-list-menubar-sort-button' onClick={() => this.props.openNavModal('notebooks-sort', 0)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path ill="#000" fillRule="nonzero" d="M8 16.793l-2.146-2.147-.708.708L8.5 18.707l3.354-3.353-.708-.708L9 16.793V5H8v11.793zM12 5h9v1h-9V5zm0 3h7v1h-7V8zm0 3h5v1h-5v-1z"></path></svg>
                </div>  
                </div>
              
              
            </div>

            <div className='notebooks-list-table-header'>
              <div className='col1'>Title</div>
              <div className='col2'>Created By</div>
              <div className='col3'>Updated</div>
              <div className='col4'>Shared With</div>
              <div className='col5'>Actions</div>
            </div>

            {/* <div className={`notebooks-list-content-ul ${sortOption}`}> */}
          <div className='notebooks-list-content-ul'>
              {notebooks.map((notebook, idx) => <NotebooksIndexItem key={notebook.id} idx={idx} notebook={notebook} deleteNotebook={this.handleDelete} openActionsModal={(navModalId) => this.handleModalClick(navModalId)} />)}
            </div>

          </div>
      </>
    );
  }
}

export default NotebooksIndex;