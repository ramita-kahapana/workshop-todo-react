import React from "react";
import styled from 'styled-components';

const TitleContainer = styled.div`
display: flex;
justify-content: center;
padding: 1rem 0;
text-transform: uppercase;
`;

function Title({ children }) {
  return (
    <TitleContainer>
      <h1>{children}</h1>
    </TitleContainer>
  );
}

export default Title;
