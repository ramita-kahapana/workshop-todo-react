import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const ActionContext = createContext({});
export function Provider({ children }) {
  const [todos, setTodos] = useState([]);
  return (
    <ActionContext.Provider value={{ todos, setTodos }}>
      {children}
    </ActionContext.Provider>
  );
}
const Constants = {
  store: 'todos',
  types: {
    todo: 'todo',
    doing: 'doing',
    done: 'done'
  }
}
export function useTodo() {
  const { todos, setTodos } = useContext(ActionContext);
  console.log(todos)
  const handleAddTodo = useCallback((todoInput) =>
    setTodos([...todos, { id: Date.now(), content: todoInput, type: Constants.types.todo }]), [setTodos, todos]);

  const handleTodoClick = useCallback((itemId) => {
    const cloneTodods = [...todos]; //clone with reference changed
    const itemIndex = cloneTodods.findIndex((todo) => todo.id === itemId);
    if (cloneTodods[itemIndex]) {
      cloneTodods[itemIndex].type = Constants.types.todo;
    }
    setTodos(cloneTodods);
  }, [todos, setTodos]);

  const handleDoClick = useCallback((itemId) => {
    const cloneTodods = [...todos]; //clone with reference changed
    const itemIndex = cloneTodods.findIndex((todo) => todo.id === itemId);
    if (cloneTodods[itemIndex]) {
      cloneTodods[itemIndex].type = Constants.types.doing;
    }
    setTodos(cloneTodods);
  }, [todos, setTodos]);

  const handleDoneClick = useCallback((itemId) => {
    const cloneTodods = [...todos]; //clone with reference changed
    const itemIndex = cloneTodods.findIndex((todo) => todo.id === itemId);
    if (cloneTodods[itemIndex]) {
      cloneTodods[itemIndex].type = Constants.types.done;
    }
    setTodos(cloneTodods);
  }, [todos, setTodos]);
  useEffect(() => {
    if (!todos.length)
      setTodos(JSON.parse(window.localStorage.getItem(Constants.store)) || []);
  }, [setTodos, todos])

  useEffect(() => {
    if (todos.length)
      window.localStorage.setItem(Constants.store, JSON.stringify(todos));
  }, [setTodos, todos]);

  const state = useMemo(() => ({
    todos: todos.filter((todo) => todo.type === "todo"),
    doings: todos.filter((todo) => todo.type === "doing"),
    dones: todos.filter((todo) => todo.type === "done")
  }), [todos])

  const dispatcher = useMemo(
    () => ({
      handleAddTodo,
      handleTodoClick,
      handleDoClick,
      handleDoneClick,
    }),
    [handleAddTodo, handleDoClick, handleDoneClick, handleTodoClick]
  );

  return [state, dispatcher];
}
export default ActionContext;