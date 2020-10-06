import React, { createContext, useContext, useState, useEffect } from "react";

const ActionContext = createContext({});
export function Provider({ children }) {
  const [todos, setTodos] = useState([]);
  return (
    <ActionContext.Provider value={{ todos, setTodos }}>
      {children}
    </ActionContext.Provider>
  );
}
export function useTodo() {
  const { todos, setTodos } = useContext(ActionContext);
  const handleAddTodo = (todoInput) =>
    setTodos([...todos, { id: Date.now(), content: todoInput, type: "todo" }]);

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
    if (!todos.length)
      setTodos(JSON.parse(window.localStorage.getItem("todos")) || []);
    if (todos.length)
      window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [setTodos, todos]);
  return [
    {
      todos: todos.filter((todo) => todo.type === "todo"),
      doings: todos.filter((todo) => todo.type === "doing"),
      dones: todos.filter((todo) => todo.type === "done")
    },
    { handleAddTodo, handleTodoClick, handleDoClick, handleDoneClick }
  ];
}
export default ActionContext;