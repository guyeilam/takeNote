import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import merge from "lodash/merge";
import NotebookIndexItem from "./notebook_index_item";
import NavModal from "../modal/nav_modal";
import { sortedItems } from "../../reducers/selectors";
import { setSort } from "../../actions/ui_actions";
import { updateNote } from "../../actions/note_actions";
import { openModal, openNavModal } from "../../actions/modal_actions";

const NotebooksIndex = props => {
  const [notesVisible, setNotesVisible] = useState({});
  const [draggedNoteId, setDraggedNoteId] = useState(null);
  const [hoverOverNotebook, setHoverOverNotebook] = useState(null);
  const [titleSortIcon, setTitleSortIcon] = useState("");
  const [updatedSortIcon, setUpdatedSortIcon] = useState("");

  const dispatch = useDispatch();

  const currentId = useSelector(state => state.session.id);
  const currentUser =
    useSelector(state => state.entities.users[currentId]) || null;

  // Sort method
  const sortMethod = useSelector(state => state.ui.sort) || null;

  // Get notebooks and notes from store and sort
  const unsortedNotebooks =
    useSelector(state => state.entities.notebooks) || null;
  const notebooks =
    Object.values(sortedItems(unsortedNotebooks, sortMethod)) || null;

  const unsortedNotes = useSelector(state => state.entities.notes) || null;
  const notes = Object.values(sortedItems(unsortedNotes, sortMethod)) || null;
  // const sorted_notebooks = notebooks ? sortedItems(notebooks, sortMethod) : null;
  // const sorted_notes = state.entities.notes ? sortedItems(state.entities.notes, state.ui.sort) : null;

  const rowSelector = idx => {
    if (idx % 2 === 0) {
      return "even-row";
    } else {
      return "odd-row";
    }
  };

  const toggleShowNotes = notebookId => {
    return () => {
      let newState;
      if (!notesVisible[notebookId]) {
        newState = merge(notesVisible, { [notebookId]: true });
        setNotesVisible(newState);
      } else {
        newState = notesVisible;
        newState[notebookId] = !newState[notebookId];
        setNotesVisible(newState);
      }
    };
  };

  const requestSpecificNote = note => {
    return e => {
      dispatch(setCurrentNote(note.id));
      props.history.push("/notes/all");
    };
  };

  // START DRAG AND DROP
  const allowDrop = (e, notebookId) => {
    e.preventDefault();
    if (hoverOverNotebook === notebookId) return null;
    setHoverOverNotebook(notebookId);
  };

  const leaveDropZone = (e, notebookId) => {
    e.preventDefault();
    setHoverOverNotebook(null);
  };

  const drag = noteId => {
    setDraggedNoteId(noteId);
  };

  const drop = (e, notebookId) => {
    e.preventDefault();
    setHoverOverNotebook(null);
    const note = Object.assign(
      {},
      { id: draggedNoteId, notebook_id: notebookId }
    );
    setDraggedNoteId(null);
    dispatch(updateNote(note));
  };
  // END DRAG AND DROP

  const sortByTitle = () => {
    const currentSort = sortMethod;
    if (currentSort === "title_descending") {
      dispatch(setSort("title_ascending"));
      setTitleSortIcon("arrow-icon-visible");
      setUpdatedSortIcon("");
    } else {
      dispatch(setSort("title_descending"));
      setTitleSortIcon("arrow-icon-visible flipped-arrow-icon");
      setUpdatedSortIcon("");
    }
  };

  const sortByUpdatedDate = () => {
    const currentSort = sortMethod;
    if (currentSort === "updated_date_ascending") {
      dispatch(setSort("updated_date_descending"));
      setTitleSortIcon("");
      setUpdatedSortIcon("arrow-icon-visible flipped-arrow-icon");
    } else {
      dispatch(setSort("updated_date_ascending"));
      setTitleSortIcon("");
      setUpdatedSortIcon("arrow-icon-visible");
    }
  };

  if (!(notebooks && notes)) {
    return null;
  }

  return (
    <>
      <div className="notebooks-list-container">
        <div className="notebooks-list-header">Notebooks</div>
        <div className="notebooks-list-menubar">
          <div className="notebooks-list-menubar-header">My notebook list</div>
          <div className="new-notebook-notebooks-index-header">
            <div
              className="notebooks-list-menubar-new-notebook-button"
              onClick={() => dispatch(openModal("new-notebook"))}
            >
              <div className="new-notebook-button-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="nonzero"
                    d="M19 17v-2h2v2h2v2h-2v2h-2v-2h-2v-2h2zm-1-2.874a4.002 4.002 0 0 0-2.952 4.497H9V4h7c1.105 0 2 .873 2 1.95v8.176zM6 4h2v14.623H6V4zm9.5 4h-4c-.276 0-.5.15-.5.333v1.334c0 .184.224.333.5.333h4c.276 0 .5-.15.5-.333V8.333C16 8.15 15.776 8 15.5 8z"
                  />
                </svg>
              </div>
              <div className="new-notebook-button-text">New Notebook</div>
            </div>

            <NavModal modalId={null} />

            <div
              className="notebooks-list-menubar-sort-button"
              onClick={() => dispatch(openNavModal("notebooks-sort", null))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  fillRule="nonzero"
                  d="M8 16.793l-2.146-2.147-.708.708L8.5 18.707l3.354-3.353-.708-.708L9 16.793V5H8v11.793zM12 5h9v1h-9V5zm0 3h7v1h-7V8zm0 3h5v1h-5v-1z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="notebooks-list-table-header">
          <div className="col1" onClick={() => sortByTitle()}>
            <div className="notebooks-table-title-text">Title</div>
            <div className={`notebooks-list-title-sort-icon ${titleSortIcon}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                />
              </svg>
            </div>
          </div>
          <div className="col2">Created By</div>
          <div className="col3" onClick={() => sortByUpdatedDate()}>
            <div className="notebooks-table-updated-text">Updated</div>
            <div
              className={`notebooks-list-updated-sort-icon ${updatedSortIcon}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                />
              </svg>
            </div>
          </div>
          <div className="col4">Shared With</div>
          <div className="col5">Actions</div>
        </div>

        <div className="notebooks-list-content-ul">
          {notebooks.map((notebook, idx) => {
            return (
              <NotebookIndexItem
                key={notebook.id}
                idx={idx}
                notebook={notebook}
                notebookId={notebook.id}
                toggleShowNotes={toggleShowNotes}
                drop={drop}
                allowDrop={allowDrop}
                leaveDropZone={leaveDropZone}
                hoverOverNotebook={hoverOverNotebook}
                drag={drag}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default withRouter(NotebooksIndex);