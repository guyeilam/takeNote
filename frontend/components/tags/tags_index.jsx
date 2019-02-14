import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestAllTags } from '../../actions/tag_actions';
import { openModal } from '../../actions/modal_actions';
import TagItem from './tag_item';

class TagsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestAllTags();
  }

  render() {

    if (this.props.tags === {}) { return null; }

    const tags = (Object.values(this.props.tags).length > 0) ? Object.values(this.props.tags).map(tag => {
      return (
        <TagItem key={tag.id} tag={tag} />
        // <div className='tag-item-button' key={tag.id}>
        //   <div className='tag-item-button-label'>
        //     {`${tag.label.substring(0,12)} ...`}
        //   </div>
        //   <div className='tag-item-button-arrow'>
        //     <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" className="arrow-facing-down"><path fill="none" d="M7 2L4 5 1 2"></path></svg>
        //   </div>
        // </div>
      );
    }) : null;
    
    return (
      <>
        <div className='tags-list-container'>
          <div className='tags-list-header-container'>
            <div className='tags-list-header'>Tags</div>
            <div className='tags-list-header-new-tag-button' onClick={() => this.props.openModal('new-tag')}>
              <div className='tags-list-header-new-tag-icon'><i className="fas fa-tags"></i></div>
              <div className='tags-list-header-new-tag-label'>New Tag</div>
            </div>
          </div>
          <div className='tags-list-content'>
            {tags}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return ({
    tags: state.entities.tags
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestAllTags: tags => dispatch(requestAllTags(tags)),
    openModal: modal => dispatch(openModal(modal))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsList));