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
              <div className='tags-list-header-new-tag-icon'>
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#222a)"><path fillRule="evenodd" clipRule="evenodd" d="M13.018 3.399L18 8.005v6.121a4.002 4.002 0 0 0-2.873 4.879H7.5a1.5 1.5 0 0 1-1.5-1.5v-9.5l4.982-4.606a1.5 1.5 0 0 1 2.036 0zM10 9a2 2 0 1 1 0 0zm-.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM9 13.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"></path><path d="M23 17h-2v-2h-2v2h-2v2h2v2h2v-2h2v-2z"></path></g><defs><clipPath id="222a"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
              </div>
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

    let tags = Object.keys(state.entities.tags).map(id => state.entities.tags[id]).sort(function (a, b) {
      a = a.label.substring(0, 1).toLowerCase();
      b = b.label.substring(0, 1).toLowerCase();
      return a > b ? 1 : a < b ? -1 : 0;
    });

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