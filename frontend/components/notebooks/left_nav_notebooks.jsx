import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { truncateStr } from "../../util/string_util";
import { setCurrentNote } from "../../actions/note_actions";
import { requestOnlyNotebooks } from "../../actions/notebook_actions";

const LeftNavNotebooks = props => {
  const dispatch = useDispatch();

  const allNotebooks = useSelector(state => state.entities.notebooks);

  useEffect(() => {
    dispatch(requestOnlyNotebooks());
  }, []);

  const openNotebook = notebookId => {
    if (props.match.params.notebookId === notebookId.toString()) {
      return null;
    } else {
      dispatch(setCurrentNote(null));
      props.history.push(`/notebooks/${notebookId}`);
    }
  };

  if (!props.showNotebooks) {
    return null;
  }

  const notebooks = allNotebooks
    ? Object.keys(allNotebooks).map(notebookId => allNotebooks[notebookId])
    : null;

  const notebookItems = notebooks
    ? notebooks.map((notebook, idx) => {
        return (
          <div
            className="left-nav-notebooks-item"
            key={idx}
            onClick={() => openNotebook(notebook.id)}
          >
            <div className="left-nav-notebooks-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                className="notebooks-expanded-icon-svg"
              >
                <path
                  id="71a"
                  d="M3 2v10h7a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zM2 1h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2V1zm2 1v10h1V2H4zm2 3v1h4V5H6z"
                />
              </svg>
            </div>
            <div className="left-nav-notebooks-title">
              {truncateStr(notebook.title, 15)}
            </div>
          </div>
        );
      })
    : null;

  return <div className="notebooks-expanded">{notebookItems}</div>;
};

export default withRouter(LeftNavNotebooks);
