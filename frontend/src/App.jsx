import React from "react";
import RoutesComponent from "./routes/routesComponent";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <RoutesComponent />
      </Router>
    </>
  );
}

export default App;
