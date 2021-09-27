import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar className="fixed" />
    </div>
  );
}

export default App;
