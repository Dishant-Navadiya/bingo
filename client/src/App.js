import React from "react";
import GamePage from "./components/GamePage";
import Join from "./components/Join";
import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/gamepage" exact component={GamePage} />
    </Router>
  );
};
export default App;
