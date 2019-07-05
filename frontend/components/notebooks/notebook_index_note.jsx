import React from 'react';
import { useDispatch } from 'react-redux';
import NavModal from '../modal/nav_modal';
import { openNavModal } from '../../actions/modal_actions';
import { formatDateTime } from '../../util/datetime_util';
import { setCurrentNote } from '../../actions/note_actions';
import { withRouter } from 'react-router-dom';
import { truncateStr } from '../../util/string_util';

const NotebookIndexNote = props => {
  const dispatch = useDispatch();

  const openNote = noteId => {
    dispatch(setCurrentNote(noteId));
    props.history.push('/notes/all');
  }

  return (
    <div className={`notebooks-index-item-hover grab ${props.rowSelector(props.idx)}`} draggable="true" onDragStart={() => props.drag(props.note.id)}>
      <div className='notebooks-item-col1 col1'>
        <div className='notebook-item-notes-detail-title-icon-note'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" fillRule="nonzero" d="M8 5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8zm8 11h1v-1h-1a.997.997 0 0 0-1 1v2h1v-2zM8 4h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm1.5 4a.5.5 0 0 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h3a.5.5 0 1 0 0-1h-3z"></path></svg>  
        </div>
        <button onClick={() => openNote(props.note.id)}><div className='notebook-item-notes-detail-title-text'>{truncateStr(props.note.title, 30)}</div></button>
      </div>

      <div className='notebooks-item-col2 col2'>
        <div className='notebook-item-created-by'>- </div>
      </div>

      <div className='notebooks-item-col3 col3'>
        <div className='notebook-item-updated'>{formatDateTime(props.note)}</div>
      </div>

      <div className='notebooks-item-col4 col4'>
        <div className='notebook-item-shared-with'>- </div>
      </div>

      <div className='notebooks-item-col5 col5'>
        <div className='notebook-item-actions'>
          <NavModal modalId={props.note.id} />
          <div className='note-actions-icon' onClick={() => dispatch(openNavModal('note-header-nav', props.note.id))}><svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M25 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-9 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-9 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="#000" fillRule="evenodd"></path></svg></div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(NotebookIndexNote);