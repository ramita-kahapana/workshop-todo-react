import React, { Suspense, lazy } from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import TodoList from "./pages/TodoList";
// import "./styles.css";
import "./sass/main.scss"

const TodoList =lazy(()=>import("./pages/TodoList"))

const GlobalStyle = createGlobalStyle`
hrml,
body,
#root {
  height: 100vh;
  width: 100vw;
  font-size: 30px;
  font-family: "Roboto", sans-serif;
}
* {
  margin: 0;
  padding: 0;
}
`;

export default function App() {

  return (
    <>
      <GlobalStyle />
      <Router>
        <Suspense fallback="...">
          <Switch>
            <Route path="/" exact component={TodoList} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}
