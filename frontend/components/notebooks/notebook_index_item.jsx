import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import NavModal from "../modal/nav_modal";
import { setCurrentNote } from "../../actions/note_actions";
import { openNavModal } from "../../actions/modal_actions";
import { sortedItems } from "../../reducers/selectors";
import { truncateStr } from "../../util/string_util";
import { formatDateTime } from "../../util/datetime_util";
import NotebookIndexNote from "./notebook_index_note";

const NotebookIndexItem = props => {
  const dispatch = useDispatch();

  const [showNotes, setShowNotes] = useState(false);
  const { notebookId } = props;

  let hoverOverNotebook =
    props.hoverOverNotebook === notebookId ? "drag-hover" : "";
  const sortMethod = useSelector(state => state.ui.sort);
  const notebook = notebookId
    ? useSelector(state => state.entities.notebooks[notebookId])
    : null;
  const allNotes = useSelector(state => state.entities.notes) || null;
  const allNotesArr = Object.values(allNotes);
  const unsortedNotes = [];

  allNotesArr
    ? allNotesArr.forEach(note => {
        if (note.notebook_id === notebookId) {
          unsortedNotes.push(note);
        }
      })
    : null;

  const notes = unsortedNotes ? sortedItems(unsortedNotes, sortMethod) : null;

  const rowSelector = idx => {
    if (idx % 2 === 0) {
      return "even-row";
    } else {
      return "odd-row";
    }
  };

  const handleShowNotes = () => {
    setShowNotes(!showNotes);
    props.toggleShowNotes(notebookId);
  };

  const requestSpecificNote = note => {
    return e => {
      dispatch(setCurrentNote(note.id));
      props.history.push("/notes/all");
    };
  };

  const arrowIconRight = (
    <svg
      width="6"
      height="9"
      viewBox="2 240 6 9"
      xmlns="http://www.w3.org/2000/svg"
      id="notebook-arrow-icon"
    >
      <path fill="#9B9B9B" fillRule="evenodd" d="M2 240l6 4.5-6 4.5z" />
    </svg>
  );
  const arrowIconClass = showNotes ? "rotated-90-degrees" : "";

  return (
    <>
      <div
        className={`notebooks-index-item-hover ${rowSelector(
          props.idx
        )} ${hoverOverNotebook}`}
        onDrop={e => props.drop(e, notebookId)}
        onDragOver={e => props.allowDrop(e, notebookId)}
        onDragLeave={e => props.leaveDropZone(e, notebookId)}
      >
        <div className="notebooks-item-col1 col1">
          <div className={`notebook-item-expand ${arrowIconClass}`}>
            <button onClick={() => handleShowNotes()}>{arrowIconRight}</button>
          </div>
          <div className="notebook-item-icon">
            <svg
              className="notebook-icon-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16 8.33c0-.18-.22-.33-.5-.33h-4c-.28 0-.5.15-.5.33v1.34c0 .18.22.33.5.33h4c.28 0 .5-.15.5-.33zM18 6v11a2 2 0 0 1-2 2H9V4h7a2 2 0 0 1 2 2zM6 4h2v15H6z" />
            </svg>
          </div>
          <div className="notebook-item-title">
            <Link to={`/notebooks/${notebookId}`}>
              {truncateStr(notebook.title, 30)} ({notes.length})
            </Link>
          </div>
        </div>

        <div className="notebooks-item-col2 col2">
          <div className="notebook-item-created-by">
            {props.currentUserEmail}
          </div>
        </div>

        <div className="notebooks-item-col3 col3">
          <div className="notebook-item-updated">
            {formatDateTime(notebook)}
          </div>
        </div>

        <div className="notebooks-item-col4 col4">
          <div className="notebook-item-shared-with">- </div>
        </div>

        <div className="notebooks-item-col5 col5">
          <div className="notebook-item-actions">
            <NavModal modalId={notebookId} />
            <button
              className="notebook-item-delete-button"
              onClick={() =>
                dispatch(openNavModal("notebook-actions-nav", notebookId))
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-9 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-9 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                  fill="#000"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {notes.map((note, indx) => {
        if (showNotes) {
          return (
            <NotebookIndexNote
              key={indx}
              idx={indx}
              note={note}
              rowSelector={rowSelector}
              requestNotes={requestSpecificNote}
              drag={props.drag}
            />
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default withRouter(NotebookIndexItem);