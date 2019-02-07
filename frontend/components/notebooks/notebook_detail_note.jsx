import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotebookDetailNote extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const clickedClass = (this.props.currentNote === this.props.note.id) ? 'notes-list-clicked' : '';

    return (
      <div className={`notebook-detail-note-clickable ${clickedClass}`}>
        <li className='notebook-detail-note' onClick={this.props.handleNoteClick(this.props.note)}>
          <div className='notebook-detail-note-title'>{this.props.note.title}</div>
          <div className='notebook-detail-note-content'>{this.props.note.plain_text.substring(0, 100)} ...</div>
          <div className='notebook-detail-note-updated-at'>{this.props.note.updated_at}</div>
        </li>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return({
    currentNote: state.ui.currentNote,
    note: ownProps.note,
    handleNoteClick: ownProps.handleNoteClick
  });
}

const mapDispatchToProps = dispatch => {
  return ({

  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookDetailNote);