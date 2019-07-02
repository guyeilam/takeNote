import React from "react";
import { useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import NavModal from "../modal/nav_modal";
import { openNavModal } from "../../actions/modal_actions";

const NoteHeader = props => {
  const dispatch = useDispatch;

  const note = props.note;

  let noteId = note.id;
  let noteNotebookId;
  let title;

  if (!note) {
    return null;
  }

  noteNotebookId = note.notebook_id;
  title = note.notebookTitle;

  if (props.match.path === "/shared_notes") {
    return (
      <div className="note-header">
        <div className="current-notebook">
          <div className="current-notebook-icon" />
          <div className="current-notebook-title" />
        </div>

        <div className="note-actions-menu" />
      </div>
    );
  }

  return (
    <div className="note-header">
      <div className="current-notebook">
        <div className="current-notebook-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <path
              fill="#000"
              fillRule="nonzero"
              d="M3 2v10h7a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zM2 1h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2V1zm2 1v10h1V2H4zm2 3v1h4V5H6z"
            />
          </svg>
        </div>
        <div className="current-notebook-title">
          <Link to={`/notebooks/${noteNotebookId}`}>{title}</Link>
        </div>
      </div>

      <div className="note-actions-menu">
        <NavModal modalId={noteId} />
        <div
          className="note-actions-icon"
          onClick={() => openNavModal("note-header-nav", noteId)(dispatch)}
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default withRouter(NoteHeader);
