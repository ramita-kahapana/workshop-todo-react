import React, { useContext } from "react";
import ActionContext from "../../contexts/ActionContext";

function ListItem({ children, id, type }) {
  const { onDoClick, onDoneClick, onTodoClick } = useContext(ActionContext);
  return (
    <li className="list-item">
      <span className="list-content">{children}</span>
      {type !== "todo" && (
        <button className="btn" onClick={() => onTodoClick(id)}>
          Todo
        </button>
      )}
      {type !== "doing" && (
        <button className="btn" onClick={() => onDoClick(id)}>
          Do
        </button>
      )}
      {type !== "done" && (
        <button className="btn" onClick={() => onDoneClick(id)}>
          Done
        </button>
      )}
    </li>
  );
}
export default ListItem;
