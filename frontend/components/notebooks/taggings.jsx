import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavModal from '../modal/nav_modal';
import { openNavModal } from '../../actions/modal_actions';

class TagItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    if (!this.props.notes) { return null; }
    if (!this.props.tags) { return null; }
    if (!this.props.currentNote) { return null; }
    
    const tags = (this.props.notes.tagIds && (this.props.notes.tagIds.length > 0) && (Object.values(this.props.tags).length >= this.props.notes.tagIds.length)) ? this.props.notes.tagIds.map(tagId => {
      if (this.props.tags[tagId]) {
        return (
          this.props.tags[tagId]
        );
      } else {
        return null;
      }
    }) : null;

    const taggings = tags ? tags.map(tag => {
      if (tag) {
        return (
          <div className='tag-label' key={tag.id}>
            <NavModal modalId={tag.id}/>
            <div className='tag-label-text'>{tag.label}</div>
            <div className='tag-label-icon' onClick={() => this.props.openNavModal('tagging-nav', tag.id)}><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" className="arrow-facing-down"><path fill="none" d="M7 2L4 5 1 2"></path></svg></div>
          </div>
        );
      } else {
        return null;
      }
    }) : null;

    return (
      <>
        {taggings}
      </>
    );
  }
}

const mapStateToProps = state => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  
  let currentNote = state.entities.notes[state.ui.currentNote];
  let tags = state.entities.tags;

  return ({
    notes: currentNote,
    defaultNotebook: currentUser.default_notebook,
    currentNote: state.ui.currentNote,
    tags
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(TagItem);