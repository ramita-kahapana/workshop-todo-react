import React, { useState } from "react";
import styled from "styled-components";

function Input({ onSubmit }) {
  const [value, setValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };
  const handleInputChange = (event) => setValue(event.target.value);

  const BaseInput = styled.input`
    outline: none;
    border: none;
    padding: 0 1rem;
    font-size: 1rem;
  `;

  const InputContainer = styled.form`
    display: flex;
    margin-bottom: 1rem;
  `;

  const Input = styled(BaseInput)`
    diaplay: ${(props) => (props.display ? "block" : "none")};
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
    width: 100%;
    transition: border-bottom 0.3s;

    &:focus {
      border-bottom: 1px solid #eead00;
    }

    &::placeholder {
      color: #aaa;
    }
  `;

  return (
    <InputContainer onSubmit={handleSubmit} className="input-container">
      <Input
        value={value}
        onChange={handleInputChange}
        placeholder="Create new task"
      />
    </InputContainer>
  );
}
export default Input;
