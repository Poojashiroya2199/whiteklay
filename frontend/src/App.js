import React from "react";
import './App.css';
import Employee from "./components/Employee"
import {Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Route path="/employee" component={Employee}/>
    </div>
  );
}

export default App;
