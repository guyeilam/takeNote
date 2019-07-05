import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavModal from "../modal/nav_modal";
import { openNavModal } from "../../actions/modal_actions";

const TagItem = () => {
  const dispatch = useDispatch();
  // Get current user's default notebook
  const currentId = useSelector(state => state.session.id);
  const currentUser =
    useSelector(state => state.entities.users[currentId]) || null;
  const defaultNotebook = currentUser.default_notebook;

  // Get current note
  const currentNoteId = useSelector(state => state.ui.currentNote);
  const currentNote = useSelector(state => state.entities.notes[currentNoteId]);

  // Get tags
  const allTags = useSelector(state => state.entities.tags);

  const tags =
    currentNote.tagIds &&
    currentNote.tagIds.length > 0 &&
    Object.values(allTags).length >= currentNote.tagIds.length
      ? currentNote.tagIds.map(tagId => {
          if (allTags[tagId]) {
            return allTags[tagId];
          } else {
            return null;
          }
        })
      : null;

  const taggings = tags
    ? tags.map(tag => {
        if (tag) {
          return (
            <div className="tag-label" key={tag.id}>
              <NavModal modalId={tag.id} />
              <div className="tag-label-text">{tag.label}</div>
              <div
                className="tag-label-icon"
                onClick={() => dispatch(openNavModal("tagging-nav", tag.id))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  className="arrow-facing-down"
                >
                  <path fill="none" d="M7 2L4 5 1 2" />
                </svg>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })
    : null;

  return <>{taggings}</>;
};

export default TagItem;