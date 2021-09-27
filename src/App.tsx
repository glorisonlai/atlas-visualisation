import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/sidebar";
import Graphs from "./components/graphs/graphs";

function App() {
  return (
    <div className="App flex">
      <div>
        <Graphs />
      </div>
      <Sidebar className="fixed" />
    </div>
  );
}

export default App;
