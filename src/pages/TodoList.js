import React from 'react';
import Title from "../components/Title";
import Input from "../components/Input";
import Lane from "../components/Lane";
import { useTodo } from "../contexts/ActionContext";
import { Link } from 'react-router-dom';

function TodoList() {
    const [, { handleAddTodo }] = useTodo();
    return (
        <div className="container">
            <Link to="/about">About</Link>
            <Title>Simple Kanban Board</Title>
            <Input onSubmit={handleAddTodo} />
            <Lane />
        </div>
    )
}
export default TodoList;