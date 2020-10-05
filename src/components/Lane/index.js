import React, { useState } from "react";
import Content from "./Content";
import ActionContext from "../../contexts/ActionContext";

function Lane({ todos, setTodos }) {
  const [doings, setDoings] = useState([]);
  const [dones, setDones] = useState([]);

  const handleDoClick = (itemIndex) => {
    if (todos[itemIndex]) setDoings([...doings, todos[itemIndex]]);
    setTodos(todos.filter((_, index) => index !== itemIndex));
  };
  const handleDoneClick = (type) => (itemIndex) => {
    if (type === "todo") {
      if (todos[itemIndex]) setDones([...dones, todos[itemIndex]]);
      return setTodos(todos.filter((_, index) => index !== itemIndex));
    }
    if (type === "doing") {
      if (doings[itemIndex]) setDones([...dones, doings[itemIndex]]);

      return setDoings(doings.filter((_, index) => index !== itemIndex));
    }
  };
  return (
    <ActionContext.Provider
      value={{ onDoClick: handleDoClick, onDoneClick: handleDoneClick }}
    >
      <div className="lane-container">
        <Content title="Todo" list={todos} type="todo" />
        <Content title="Doing" list={doings} type="doing" />
        <Content title="Done" list={dones} />
      </div>
    </ActionContext.Provider>
  );
}
export default Lane;
