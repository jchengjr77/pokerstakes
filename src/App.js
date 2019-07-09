import React from 'react';
import './App.css';
import Header from "./Header.jsx";
import Counters from "./Counters.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Counters />
    </div>
  );
}

export default App;
