import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import TableComponent from "./component/table/TableComponent";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <TableComponent />
      {/* <BrowserRouter>
        <Route path="/add-user"></Route>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
