import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LeftNavNotebooks extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestAllNotebooks();
  }

  render() {
    if (!this.props.showNotebooks) { return null; }

    const notebooks = this.props.notebooks ? Object.keys(this.props.notebooks).map(notebookId => this.props.notebooks[notebookId]) : null;

    const notebookItems = notebooks ? notebooks.map((notebook, idx) => {
      return (
        <div className='left-nav-notebooks-item' key={idx} onClick={() => this.props.history.push(`/notebooks/${notebook.id}`)}>
          <div className='left-nav-notebooks-icon'><svg className='notebook-icon-svg' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs></defs><path className="cls-1" d="M16 8.33c0-.18-.22-.33-.5-.33h-4c-.28 0-.5.15-.5.33v1.34c0 .18.22.33.5.33h4c.28 0 .5-.15.5-.33zM18 6v11a2 2 0 0 1-2 2H9V4h7a2 2 0 0 1 2 2zM6 4h2v15H6z"></path></svg></div>
          <div className='left-nav-notebooks-title'>{notebook.title}</div>
        </div>
      )
    }) : null;

    return (
      <div>
        {notebookItems}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    notebooks: state.entities.notebooks,
    showNotebooks: ownProps.showNotebooks
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftNavNotebooks));