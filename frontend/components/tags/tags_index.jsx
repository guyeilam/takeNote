import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestAllTags } from '../../actions/tag_actions';
import { openModal } from '../../actions/modal_actions';
import TagItem from './tag_item';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';
import merge from 'lodash/merge';

class TagsList extends Component {
  constructor(props) {
    super(props);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  componentDidMount() {
    this.props.requestAllTags();
  }

  handleModalClick(navModalId) {
      this.props.openNavModal('tag-actions-nav', navModalId);
  }

  render() {

    if (this.props.tags === {}) { return null; }
    
    // const tags = (Object.values(this.props.tags).length > 0) ? Object.values(this.props.tags).map(tag => {
    //   return (
    //     <TagItem key={tag.id} tag={tag} openNavModal={this.handleModalClick}/>
    //   );
    // }) : null;
    
    
    const tags = (Object.keys(this.props.tags).length > 0) ? Object.keys(this.props.tags).map(tagLetter => {
      return (
        Object.values(this.props.tags[tagLetter]).map((tag,idx) => {
          return (
            <TagItem key={tag.id} idx={idx} tag={tag} openNavModal={this.handleModalClick} />
          );
        })
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

  let sorted_tags = () => {

    let tags = Object.keys(state.entities.tags).map(id => state.entities.tags[id]);

    let sortedTags = {};

    tags.forEach(tag => {
      sortedTags = merge(sortedTags, {[tag.label.substring(0,1)]: {[tag.id]: tag }});
    });
    
    return sortedTags;
  }
  
  return ({
    tags: sorted_tags()
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestAllTags: tags => dispatch(requestAllTags(tags)),
    openModal: modal => dispatch(openModal(modal)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal())
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsList));