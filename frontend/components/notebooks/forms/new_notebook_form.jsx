import React from 'react';
import { withRouter } from 'react-router-dom';

class NewNotebookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
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
    let notebook;
    if (this.props.formType === 'new-notebook') {
      notebook = Object.assign({}, {title: this.state.title});
    } else {
      notebook = Object.assign({}, {id: this.props.notebookId, title: this.state.title});
    }
    
    this.props.processForm(notebook).then(this.props.closeModal);
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
    
    if (this.props.formType === 'new-notebook') {
      headerText = 'Create new notebook';
      subHeaderText = (<div className='new-notebook-form-text'>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</div>);
      formTitleText = 'Title';
    } else {
      headerText = 'Rename notebook';
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
                  value={this.state.title}
                  onChange={this.update('title')}
                  className="new-notebook-form-input"
                  placeholder='Notebook name'
                />
                </div>
            </label>
            <div className='new-notebook-form-buttons'>
              <div onClick={this.props.closeModal} className='white-cancel-button'>Cancel</div>
              <input className="white-new-notebook-continue-button" type="submit" value='Continue' disabled={this.state.disabled}/>
            </div>
          </div>
         </form>
      </div>
    );
  }
}

export default withRouter(NewNotebookForm);