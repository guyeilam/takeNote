import React, { Component } from 'react';
import NotebooksIndexItem from './notebook_index_item';
import NavModal from '../modal/nav_modal';
import NotebookIndexNote from './notebook_index_note';

class NotebooksIndex extends Component {
  constructor(props) {
    super(props);
    this.rowSelector = this.rowSelector.bind(this);
    this.requestSpecificNote = this.requestSpecificNote.bind(this);
  }

  rowSelector(idx) {
    if (idx % 2 === 0) {
      return 'even-row';
    } else {
      return 'odd-row';
    }
  }

  requestSpecificNote(note) {
    return (e) => {
      this.props.setCurrentNote(note.id);
      this.props.history.push('/notes/all');
    }
  }

  componentDidMount() {
    this.props.requestAllNotebooks();
  }

  render() {
    const notebooks = Object.values(this.props.notebooks);
    const notes = Object.values(this.props.notes);
    let table = [];

    if (!(notebooks && notes)) { return null; }


    notebooks.forEach((notebook, idx) => {
      let notebookRow = (
        <NotebooksIndexItem key={notebook.id} idx={idx} notebookId={notebook.id} />
      );
      table.push(notebookRow);
      
      notes.forEach((note, idxn) => {
        let noteRow = (
          // <section className='notebooks-index-item-notes'>
            <NotebookIndexNote key={idxn} idx={idxn} note={note} rowSelector={this.rowSelector} requestNotes={this.requestSpecificNote} />
          // </section>
        );
        if (note.notebook_id === notebook.id) {
          table.push(noteRow);
        }
      });
      
    });

    
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
                  
                  <NavModal modalId={null} />
                  
                  <div className='notebooks-list-menubar-sort-button' onClick={() => this.props.openNavModal('notebooks-sort', null)}>
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

            <div className='notebooks-list-content-ul'>
              {table}
            </div>

          </div>
      </>
    );
  }
}

export default NotebooksIndex;