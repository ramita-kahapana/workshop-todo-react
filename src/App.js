import React, { useState } from "react";
import Title from "./components/Title";
import Input from "./components/Input";
import Lane from "./components/Lane";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const handleAddTodo = (todoInput) => {
    setTodos([...todos, { id: Date.now(), content: todoInput, type: "todo" }]);
  };
  return (
    <div className="container">
      <Title>Simple Kanban Board</Title>
      <Input onSubmit={handleAddTodo} />
      <Lane todos={todos} setTodos={setTodos} />
    </div>
  );
}
