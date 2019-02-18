import React from 'react';

const AllNotesTagLabel = (props) => {
  if (!props) { return null; }

  let tagLabel;

  if (props.label.length > 8) {
    tagLabel = props.label.substring(0, 8) + ' ...';
  } else {
    tagLabel = props.label;
  }
  
  return (
    <>
      <div className='view-tag-label-text'>
        {tagLabel}
      </div>
      <div className='view-tag-label-close' onClick={() => props.closeTag()}>
        <svg height='13px' width='13px' viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg"><path d="M7.728 6.314l4.95-4.95L11.263-.05 6.313 4.9 1.365-.05-.05 1.364l4.95 4.95-4.95 4.95 1.414 1.414 4.95-4.95 4.95 4.95 1.414-1.415-4.95-4.95z" fill="white" fillRule="evenodd"></path></svg>
      </div>  
    </>
  );
}

export default AllNotesTagLabel;