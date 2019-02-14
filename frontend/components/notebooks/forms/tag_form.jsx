import React from 'react';
import { withRouter } from 'react-router-dom';

class TagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      disabled: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (this.props.formType === 'new-tag') {
      tag = Object.assign({}, { label: this.state.label });
    } else {
      tag = Object.assign({}, { id: this.props.tagId, label: this.state.label });
    }

    this.props.processForm(tag).then(this.props.closeModal);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {

    let headerText;
    let subHeaderText;
    let formTitleText;

    if (this.props.formType === 'new-tag') {
      headerText = 'Create new tag';
      subHeaderText = '';
      formTitleText = 'Name';
    } else {
      headerText = 'Rename tag';
      subHeaderText = '';
      formTitleText = 'Name';
    }

    return (
      <div className="new-notebook-form-container">
        <form onSubmit={this.handleSubmit} className="new-notebook-form">
          <div className='new-notebook-form-header'>
            <div className='new-notebook-form-header-text'>{headerText}</div>
            <div onClick={this.props.closeModal} className="close-x">X</div>
          </div>
          {subHeaderText}
          <div className="new-notebook-form-content">
            <div className='new-notebook-form-errors'>{this.renderErrors()}</div>
            <label><div className='new-notebook-form-title-label'>{formTitleText}</div>
              <div className='new-notebook-form-title-input'>
                <input required id='new-notebook-title' type="text"
                  value={this.state.label}
                  onChange={this.update('label')}
                  className="new-notebook-form-input"
                  placeholder='Tag name'
                />
              </div>
            </label>
            <div className='new-notebook-form-buttons'>
              <button onClick={this.props.closeModal} className='white-cancel-button'>Cancel</button>
              <input className="white-new-notebook-continue-button" type="submit" value='Done' disabled={this.state.disabled} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(TagForm);