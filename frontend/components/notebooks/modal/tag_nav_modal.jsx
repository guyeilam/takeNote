import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeNavModal } from "../../../actions/modal_actions";
import { deleteTag } from "../../../actions/tag_actions";

const TagActions = props => {
  const dispatch = useDispatch();

  const tagId = props.tagId;
  const tag = useSelector(state => state.entities.tags[tagId]);

  const handleDelete = tag => {
    return e => {
      dispatch(closeNavModal());
      dispatch(deleteTag(tag));
    };
  };

  const handleRename = () => {
    return e => {
      dispatch(closeNavModal());
      dispatch(openModal("rename-tag", tagId));
    };
  };

  return (
    <>
      <div className="tag-actions-nav-text">
        <div className="tag-actions-nav-delete" onClick={handleDelete(tag)}>
          <div className="tag-actions-nav-button-text">Delete tag...</div>
        </div>
        <div className="tag-actions-nav-rename" onClick={handleRename()}>
          <div className="tag-actions-nav-button-text">Rename Tag...</div>
        </div>
      </div>
    </>
  );
};

export default TagActions;
