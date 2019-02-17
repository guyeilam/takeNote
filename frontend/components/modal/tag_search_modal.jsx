import React, { Component } from 'react';
import { connect } from 'react-redux';

class TagSearchModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if ((!this.props.searchResults) || (this.props.searchResults.length === 0)) { return null; }
    
    const searchResults = (this.props.searchResults.length > 0) ? this.props.searchResults.map((result, idx) => {
      return (
        <div className='tagging-search-result' key={idx}>{result}</div>
      );
    }) : null;

    return (
      <>
        <div className='taggings-search-modal'>
          <div className='taggings-search-modal-child'>
            {searchResults}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchResults: ownProps.searchResults
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagSearchModal);