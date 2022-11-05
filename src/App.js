import React from "react";
import "./App.css";
import SearchBreed from "./components/searchBreed";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center">BREED SEARCH</h1>
        <SearchBreed />
      </div>
    </div>
  );
}

export default App;