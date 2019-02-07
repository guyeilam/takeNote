import React from 'react';

const NotebookDetailNote = (props) => {
  return (
    <li className='notebook-detail-note'>
      <button onClick={props.handleNoteClick(props.note)}>
        <div className='notebook-detail-note-title'>{props.note.title}</div>
        <div className='notebook-detail-note-content'>{props.note.plain_text.substring(0, 100)} ...</div>
      </button>
    </li>
  );
}

export default NotebookDetailNote;