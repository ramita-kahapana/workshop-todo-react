import React, { useContext } from "react";
import ActionContext from "../../contexts/ActionContext";

function ListItem({ children, index, type }) {
  const { onDoClick, onDoneClick } = useContext(ActionContext);
  return (
    <li className="list-item">
      <span className="list-content">{children}</span>
      <button className="btn" onClick={() => onDoClick(index)}>
        Do
      </button>
      <button className="btn" onClick={() => onDoneClick(type)(index)}>
        Done
      </button>
    </li>
  );
}
export default ListItem;
