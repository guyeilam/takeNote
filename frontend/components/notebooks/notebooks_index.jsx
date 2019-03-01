import React, { Component } from 'react';
import merge from 'lodash/merge';
import NotebooksIndexItem from './notebook_index_item';
import NavModal from '../modal/nav_modal';
import NotebookIndexNote from './notebook_index_note';

class NotebooksIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesVisible: {},
      draggedNoteId: null,
      hoverOverNotebook: null,
      titleSortIcon: '',
      updatedSortIcon: ''
    }
    this.rowSelector = this.rowSelector.bind(this);
    this.requestSpecificNote = this.requestSpecificNote.bind(this);
    this.toggleShowNotes = this.toggleShowNotes.bind(this);
    this.notesVisible = this.notesVisible.bind(this);
    this.drag = this.drag.bind(this);
    this.drop = this.drop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.leaveDropZone = this.leaveDropZone.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByUpdatedDate = this.sortByUpdatedDate.bind(this);
  }

  rowSelector(idx) {
    if (idx % 2 === 0) {
      return 'even-row';
    } else {
      return 'odd-row';
    }
  }

  notesVisible(notebookId) {
    if (!this.state.notesVisible[notebookId] || (this.state.notesVisible[notebookId] === false)) {
      return false;
    } else {
      return true;
    }
  }

  toggleShowNotes(notebookId) {
    let newState;
    if (!this.state.notesVisible[notebookId]) {
      newState = merge(this.state.notesVisible, { [notebookId]: true });
      this.setState({ notesVisible: newState });
    } else {
      newState = this.state.notesVisible;
      newState[notebookId] = !newState[notebookId];
      this.setState({ notesVisible: newState });
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

  sortByTitle() {
    let currentSort = this.props.sortMethod;
    if (currentSort === 'title_descending') {
      this.props.setSort('title_ascending');
      this.setState({ titleSortIcon: 'arrow-icon-visible', updatedSortIcon: '' });
    } else {
      this.props.setSort('title_descending');
      this.setState({ titleSortIcon: 'arrow-icon-visible flipped-arrow-icon', updatedSortIcon: '' });
    }
  }

  sortByUpdatedDate() {
    let currentSort = this.props.sortMethod;
    if (currentSort === 'updated_date_ascending') {
      this.props.setSort('updated_date_descending');
      this.setState({ titleSortIcon: '', updatedSortIcon: 'arrow-icon-visible flipped-arrow-icon' });
    } else {
      this.props.setSort('updated_date_ascending');
      this.setState({ titleSortIcon: '', updatedSortIcon: 'arrow-icon-visible' });
    }
  }

  // START DRAG AND DROP

  allowDrop(e, notebookId) {
    // $(e.target).attr("drop-active", true);
    e.preventDefault();
    if (this.state.hoverOverNotebook === notebookId) {
      return null;
    }
    this.setState({ hoverOverNotebook: notebookId });
  }

  leaveDropZone(e, notebookId) {
    e.preventDefault();
    this.setState({ hoverOverNotebook: null });
  }

  drag(noteId) {
    // e.dataTransfer.setData("integer", e.target.id);
    this.setState({ draggedNoteId: noteId });
  }

  drop(e, notebookId) {
    // $(e.target).removeAttr("drop-active");
    e.preventDefault();
    this.setState({ hoverOverNotebook: null });
    let note;

    if (this.props.notes[this.state.draggedNoteId].notebook_id === notebookId) {
      return null;
    }

    note = Object.assign({}, { id: this.state.draggedNoteId, notebook_id: notebookId });
    this.setState({ draggedNoteId: null });
    this.props.updateNote(note);
    
    // let data = e.dataTransfer.getData("integer");
    // e.target.appendChild(document.getElementById(data));
  }

  // END DRAG AND DROP

  render() {
    const notebooks = Object.values(this.props.notebooks);
    const notes = Object.values(this.props.notes);
    let table = [];

    if (!(notebooks && notes)) { return null; }


    notebooks.forEach((notebook, idx) => {

      
      let notebookRow = (
        <NotebooksIndexItem key={notebook.id} idx={idx} notebookId={notebook.id} toggleShowNotes={this.toggleShowNotes} drop={this.drop} allowDrop={this.allowDrop} leaveDropZone={this.leaveDropZone} hoverOverNotebook={this.state.hoverOverNotebook}/>
      );
      table.push(notebookRow);
      
      notes.forEach((note, idxn) => {
        let noteRow = (
          // <section className='notebooks-index-item-notes'>
            <NotebookIndexNote key={idxn} idx={idxn} note={note} rowSelector={this.rowSelector} requestNotes={this.requestSpecificNote} drag={this.drag}/>
          // </section>
        );
        if ((note.notebook_id === notebook.id) && (this.notesVisible(notebook.id))) {
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
              <div className='col1' onClick={() => this.sortByTitle()}>
                <div className='notebooks-table-title-text'>Title</div>
                <div className={`notebooks-list-title-sort-icon ${this.state.titleSortIcon}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 448 512" ><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>                  
                  </div>
              </div>
              <div className='col2'>Created By</div>
              <div className='col3' onClick={() => this.sortByUpdatedDate()}>
                <div className='notebooks-table-updated-text'>Updated</div>
                <div className={`notebooks-list-updated-sort-icon ${this.state.updatedSortIcon}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 448 512" ><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
                </div>
              </div>
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