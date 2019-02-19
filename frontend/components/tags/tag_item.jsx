import React from 'react';
import NavModal from '../modal/nav_modal';
import { Link } from 'react-router-dom';

const TagItem = (props) => {

  let tagLabel;
  let printLetter;

  if (!props.tag) {
    return null;
  } else {

    if (props.tag.label.length > 6) {
      tagLabel = props.tag.label.substring(0, 6) + ' ...';
    } else {
      tagLabel = props.tag.label;
    }

    if (props.idx === 0) {
      printLetter = <div className='tag-header-letter'>{props.tag.label.substring(0,1)}</div>;
    }
    
    const numTags = props.tag.noteIds ? props.tag.noteIds.length : '0';
    
    return (
      <div className='tag-item-container'>
        {printLetter}
        <div className={`tag-item-button tag${props.tag.id}`}>
          <div className='tag-item-button-label'>
            <Link to={`/tags/${props.tag.id}`}>{tagLabel} ({numTags} notes)</Link>
          </div>
          <div className='tag-item-button-arrow' onClick={() => props.openNavModal(props.tag.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" className="arrow-facing-down"><path fill="none" d="M7 2L4 5 1 2"></path></svg>
          </div>
        </div>
          <NavModal modalId={props.tag.id} />
      </div>
    );
  }
}

export default TagItem;