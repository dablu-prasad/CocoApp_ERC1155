import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import CreateItem from './CreateItem';
import Index_Home from './Index_Home';
import NavBar from './NavBar';


function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="overlay">
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="Event">
        <CreateItem accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div>
        <Index_Home />
      </div>
    </div>
  );
}

export default App;
