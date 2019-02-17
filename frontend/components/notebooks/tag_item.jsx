import React, { Component } from 'react';
import { connect } from 'react-redux';

class TagItem extends Component {
  render() {
    
    if (!this.props.notes) { return null; }
    if (!this.props.tags) { return null; }

    const tags = (this.props.notes.tagIds && (this.props.notes.tagIds.length > 0) && (Object.values(this.props.tags).length > 0)) ? this.props.notes.tagIds.map(tagId => {
      return (
        this.props.tags[tagId]
      );
    }) : null;

    const taggings = tags ? tags.map(tag => {
      return (
        <div key={tag.id} className='tag-label'>{tag.label}</div>
      );
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

  return ({
    notes: state.entities.notes[state.ui.currentNote],
    defaultNotebook: currentUser.default_notebook,
    currentNote: state.ui.currentNote,
    tags: state.entities.tags
  });
}

const mapDispatchToProps = dispatch => {
  return ({

  });
}

export default connect(mapStateToProps, mapDispatchToProps)(TagItem);