import React from 'react';
import './css/App.css';
import Header from "./components/Header.jsx";
import Counters from "./components/Counters.jsx";

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
