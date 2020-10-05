import React, { useEffect, useState } from "react";
import Content from "./Content";
import ActionContext from "../../contexts/ActionContext";

function Lane({ todos, setTodos }) {
  // const [doings, setDoings] = useState([]);
  // const [dones, setDones] = useState([]);
  const handleTodoClick = (itemId) => {
    const cloneTodods = [...todos]; //clone with reference changed
    const itemIndex = cloneTodods.findIndex((todo) => todo.id === itemId);
    if (cloneTodods[itemIndex]) {
      cloneTodods[itemIndex].type = "todo";
    }
    setTodos(cloneTodods);
  };
  const handleDoClick = (itemId) => {
    const cloneTodods = [...todos]; //clone with reference changed
    const itemIndex = cloneTodods.findIndex((todo) => todo.id === itemId);
    if (cloneTodods[itemIndex]) {
      cloneTodods[itemIndex].type = "doing";
    }
    setTodos(cloneTodods);
  };
  const handleDoneClick = (itemId) => {
    const cloneTodods = [...todos]; //clone with reference changed
    const itemIndex = cloneTodods.findIndex((todo) => todo.id === itemId);
    if (cloneTodods[itemIndex]) {
      cloneTodods[itemIndex].type = "done";
    }
    setTodos(cloneTodods);
  };

  useEffect(() => {
    setTodos(JSON.parse(window.localStorage.getItem("todos")));
  }, [setTodos]);
  useEffect(() => {
    if (todos.length)
      window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [setTodos, todos]);
  return (
    <ActionContext.Provider
      value={{
        onTodoClick: handleTodoClick,
        onDoClick: handleDoClick,
        onDoneClick: handleDoneClick
      }}
    >
      <div className="lane-container">
        <Content
          title="Todo"
          list={todos.filter((todo) => todo.type === "todo")}
        />
        <Content
          title="Doing"
          list={todos.filter((todo) => todo.type === "doing")}
        />
        <Content
          title="Done"
          list={todos.filter((todo) => todo.type === "done")}
        />
      </div>
    </ActionContext.Provider>
  );
}
export default Lane;
