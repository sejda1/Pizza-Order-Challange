import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {


  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="order"><Order /></Route>
        <Route path="success"><Assent /></Route>
      </Switch>
    </Router>

  )
}

export default App
