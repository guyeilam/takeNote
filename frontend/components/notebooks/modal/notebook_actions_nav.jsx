import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeNavModal } from "../../../actions/modal_actions";
import {
  deleteNotebookById,
  requestAllNotebooks
} from "../../../actions/notebook_actions";
import { updateDefaultNotebook } from "../../../actions/user_actions";

const NotebookActionsNav = props => {
  const dispatch = useDispatch();

  const currentId = useSelector(state => state.session.id);
  const currentUser =
    useSelector(state => state.entities.users[currentId]) || null;

  const defaultNotebookId = currentUser.default_notebook;
  const notebookId = props.notebookId;

  const handleDelete = notebookId => {
    return e => {
      dispatch(closeNavModal());
      dispatch(deleteNotebookById(notebookId)).then(() =>
        dispatch(requestAllNotebooks())
      );
    };
  };

  const handleRenameNotebook = () => {
    return e => {
      dispatch(closeNavModal());
      dispatch(openModal("rename-notebook", notebookId));
    };
  };

  const handleUpdateDefaultNotebook = notebookId => {
    return e => {
      dispatch(closeNavModal());
      dispatch(updateDefaultNotebook(notebookId));
    };
  };

  const activeDeleteButton =
    notebookId !== defaultNotebookId ? (
      <div
        className="notebook-actions-nav-delete"
        onClick={handleDelete(notebookId)}
      >
        <div className="notebook-item-delete">Delete notebook</div>
      </div>
    ) : (
      <div className="notebook-actions-nav-delete-deactivated">
        <div className="notebook-item-delete-deactivated">Delete notebook</div>
      </div>
    );
  const activeDefaultNotebookButton =
    notebookId !== defaultNotebookId ? (
      <div
        className="notebook-actions-nav-default-notebook"
        onClick={handleUpdateDefaultNotebook(notebookId)}
      >
        <div className="notebook-item-default">Make default notebook...</div>
      </div>
    ) : (
      <div className="notebook-actions-nav-default-notebook-deactivated">
        <div className="notebook-item-default-deactivated">
          Make default notebook...
        </div>
      </div>
    );

  return (
    <>
      <div className="notebook-actions-nav-text">
        <div
          className="notebook-actions-nav-rename"
          onClick={handleRenameNotebook()}
        >
          <div className="notebook-item-rename">Rename notebook...</div>
        </div>
        {activeDeleteButton}
        {activeDefaultNotebookButton}
      </div>
    </>
  );
};

export default NotebookActionsNav;
