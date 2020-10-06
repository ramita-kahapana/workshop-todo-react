import React, { createContext, useContext, useState, useEffect, useCallback, useReducer, useMemo } from "react";

const ActionContext = createContext({});
const INITAIL_STATE = [];
function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload || [];
    case "ADD":
      return [...state, { id: Date.now(), content: action.payload, type: Constants.types.todo },];
    case "TODO":
    case "DOING":
    case "DONE": {
      const cloneTodods = [...state];
      const itemIndex = cloneTodods.findIndex((todo) => todo.id === action.payload);
      if (cloneTodods[itemIndex])
        cloneTodods[itemIndex].type = Constants.types[action.type.toLowerCase()];
      return cloneTodods
    }
    default:
      return state;
  }
}

export function Provider({ children }) {
  const [todos, dispatch] = useReducer(reducer, INITAIL_STATE)
  return (
    <ActionContext.Provider value={{ todos, dispatch }}>
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
  const { todos, setTodos, dispatch } = useContext(ActionContext);
  const handleAddTodo = useCallback((todoInput) => dispatch({ type: "ADD", payload: todoInput }), [dispatch]);
  const handleTodoClick = useCallback((itemId) => dispatch({ type: "TODO", payload: itemId }), [dispatch])
  const handleDoClick = useCallback((itemId) => dispatch({ type: "DOING", payload: itemId }), [dispatch])
  const handleDoneClick = useCallback((itemId) => dispatch({ type: "DONE", payload: itemId }), [dispatch])

  useEffect(() => {
    if (!todos.length)
      dispatch({
        type: "INIT", payload: JSON.parse(window.localStorage.getItem(Constants.store)),
      });
  }, [dispatch, todos.length]);

  useEffect(() => {
    if (todos.length)
      window.localStorage.setItem(Constants.store, JSON.stringify(todos));
  }, [todos]);

  const state = useMemo(() => ({
    todos: todos.filter((todo) => todo.type === Constants.types.todo),
    doings: todos.filter((todo) => todo.type === Constants.types.doing),
    dones: todos.filter((todo) => todo.type === Constants.types.done)
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