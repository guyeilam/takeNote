import React, { Component } from 'react';
import ReactQuill from 'react-quill';

class NoteEdit extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // this.props.requestSingleNotebook(this.props.match.params.notebookId);
    // this.props.requestSingleNote(this.props.noteId);
    // this.setState({ text: this.props.notes[0].content })
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  render() {
    if (!this.props.notebook) return null;
    return (
      <div className='note-edit-container'>
        <ReactQuill value={this.state.text}
          onChange={this.handleChange} />
      </div>
    );
  }
}

export default NoteEdit;