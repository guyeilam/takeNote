import React from 'react';

const NotebookDetailNoteItem = (props) => {
  return (
    <li className='notebook-detail-note'>
      <div className='notebook-detail-note-title'><button onClick={props.handleNoteClick(props.note)}>{props.note.title}</button></div>
      <div className='notebook-detail-note-content'>{props.note.content.substring(0, 100)} ...</div>
    </li>
  );
}

export default NotebookDetailNoteItem;