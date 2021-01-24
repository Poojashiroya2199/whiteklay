import React from "react";
import './App.css';
import Employee from "./components/Employee";
import Role from "./components/Roles";
import Organization from "./components/Organization";
import {Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Route path="/employee" component={Employee}/>
      <Route path="/role" component={Role}/>
      <Route path="/organization" component={Organization}/>
    </div>
  );
}

export default App;
