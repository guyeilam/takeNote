import React from 'react';

const TagItem = (props) => {

  let tagLabel;

  if (!props.tag) {
    return null;
  } else {

    if (props.tag.label.length > 12) {
      tagLabel = props.tag.label.substring(0, 12) + ' ...';
    } else {
      tagLabel = props.tag.label;
    }

    return (
      <div className='tag-item-button'>
        <div className='tag-item-button-label'>
          {tagLabel}
        </div>
        <div className='tag-item-button-arrow'>
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" className="arrow-facing-down"><path fill="none" d="M7 2L4 5 1 2"></path></svg>
        </div>
      </div>
    );
  }
}

export default TagItem;