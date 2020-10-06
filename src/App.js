import React from "react";
import Title from "./components/Title";
import Input from "./components/Input";
import Lane from "./components/Lane";
import { useTodo } from "./contexts/ActionContext";
import "./styles.css";

export default function App() {
  const [, { handleAddTodo }] = useTodo();

  return (
    <div className="container">
      <Title>Simple Kanban Board</Title>
      <Input onSubmit={handleAddTodo} />
      <Lane />
    </div>
  );
}
