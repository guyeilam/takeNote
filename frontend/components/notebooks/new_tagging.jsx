import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestAllTags, createTag, createTagging } from '../../actions/tag_actions';
import { requestSingleNote } from '../../actions/note_actions';
import Taggings from './taggings';
import TagSearchModal from '../modal/tag_search_modal';

class NewTagging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      disabled: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.update = this.update.bind(this);
    this.selectTag = this.selectTag.bind(this);
  }

  componentDidMount() {
    this.props.requestAllTags();
  }

  update(field) {
    return e => {
      if (e.currentTarget.value.length > 0) {
        return this.setState({ [field]: e.currentTarget.value, ['disabled']: false });
      } else {
        return this.setState({ [field]: e.currentTarget.value, ['disabled']: true });
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let tag;
    let searchResult;
    let label = this.state.label;
    
    this.setState({
      label: ''
    });
    searchResult = this.handleSearch(label);

    if (this.props.notes.tagIds.includes(searchResult) || (label === '')) {
      return null;
    }
    
    if (searchResult) {
      this.props.createTagging(searchResult, this.props.currentNote).then(() => this.props.requestSingleNote(this.props.currentNote));
    } else {
      tag = Object.assign({}, { label: label });
      this.props.createTag(tag).then(response => {
        this.props.createTagging(Object.keys(response.payload.tags)[0], this.props.currentNote).then(() => this.props.requestSingleNote(this.props.currentNote));
      });
    }
  }

  // BEGIN AUTOCOMPLETE

  handleSearch(searchTitle) {
    // e.preventDefault();
    let tagId = null;
    let tagsArray = Object.values(this.props.tags);
    tagsArray.forEach(tag => {

      if (tag.label === searchTitle) {
        tagId = tag.id;
      }
    });

    return tagId;
  }

  matches() {
    const matches = [];
    if (this.state.label.length === 0) {
      return null;
    }

    Object.values(this.props.tags).forEach(tag => {
      const sub = tag.label.slice(0, this.state.label.length);
      if ((sub.toLowerCase() === this.state.label.toLowerCase()) && (!this.props.notes.tagIds.includes(tag.id))) {
        matches.push(tag.label);
      }
    });

    // if (matches.length === 0) {
      // matches.push('No matches');
    // }

    return matches;
  }

  selectTag(event) {
    const label = event.currentTarget.innerText;
    this.setState({ label: '' });
    // this.handleSubmit(event);
    let searchResult = this.handleSearch(label);
    this.props.createTagging(searchResult, this.props.currentNote).then(() => this.props.requestSingleNote(this.props.currentNote));
  }

  // END AUTOCOMPLETE

  render() {

    // BEGIN RENDER SEARCH

    let results;
    let matches = this.matches();

    if (matches) {
      results = this.matches().map((result, i) => {
        return (
          <li key={i} onClick={this.selectTag}>{result}</li>
        );
      });
    }

    // END RENDER SEARCH
    
    if (!this.props.notes) { return null; }
    if (!this.props.tags) { return null; }
    
    // const tags = (this.props.notes.tagIds && (this.props.notes.tagIds.length > 0) && (Object.values(this.props.tags).length > 0)) ? this.props.notes.tagIds.map(tagId => {
    //   return (
    //     this.props.tags[tagId]
    //   );
    // }) : null;
    
    // const taggings = tags ? tags.map(tag => {
    //   return (
    //     <div key={tag.id} >{tag.label}</div>
    //   );
    // }) : null;

    return (
      <div className='note-tags-container'>
        <div className='note-tags-new-tag-button' onClick={this.handleSubmit}>
          <div className='note-tags-new-tag-button-icon'>
            <svg width="21" height="23" viewBox="0 0 21 23" xmlns="http://www.w3.org/2000/svg"><path d="M11.36 12.488H3.513v1.128h6.776a6.538 6.538 0 0 1 1.073-1.128zm-2.05 3.024H3.512v1.104H9.06a6.46 6.46 0 0 1 .25-1.104zm6.801 1.377v-2.445H14.89v2.445h-2.445v1.222h2.445v2.445h1.222V18.11h2.445V16.89H16.11zM15.512 12H15.5c-.52 0-1.023.072-1.5.207V7.16l-6-5.4-6 5.4v11.352h8.093A5.46 5.46 0 0 0 10.6 20H2a1.48 1.48 0 0 1-1.488-1.488V7.16c0-.432.168-.816.48-1.104l6-5.4a1.48 1.48 0 0 1 2.016 0l6 5.4c.312.288.504.672.504 1.104V12zM6.128 7.256c0-1.032.84-1.872 1.872-1.872s1.872.84 1.872 1.872S9.032 9.128 8 9.128a1.874 1.874 0 0 1-1.872-1.872zm2.616 0A.733.733 0 0 0 8 6.512a.733.733 0 0 0-.744.744c0 .408.336.744.744.744a.748.748 0 0 0 .744-.744zM15.5 23a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" fill="#C3C3C3" fillRule="evenodd"></path></svg>
          </div>
        </div>

        <div className='show-taggings-container'>
          <Taggings />
        </div>

        <div className='new-tagging-form-container'>
          <form onSubmit={this.handleSubmit} className='new-tagging-form'>
            <div className='new-tagging-form-input'>
              <input required id='new-tagging-label' type="text"
                value={this.state.label}
                onChange={this.update('label')}
                className="new-tagging-input-label"
              />
            </div>
            <input className="new-tagging-submit-button" type="submit" value='New Tag' hidden disabled={this.state.disabled} />
          </form>
        </div>

        <div className='tag-search-results'>
          <TagSearchModal searchResults={results} />
        </div>

      </div>
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
    requestAllTags: () => dispatch(requestAllTags()),
    createTag: (tag) => dispatch(createTag(tag)),
    createTagging: (tagId, noteId) => dispatch(createTagging(tagId, noteId)),
    requestSingleNote: noteId => dispatch(requestSingleNote(noteId))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTagging);