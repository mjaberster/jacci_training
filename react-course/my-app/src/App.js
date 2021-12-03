import React, {useState} from 'react';
import './App.css';
import AgendaList from './components/agenda-list/AgendaList';
import Home from './components/Home'
import data from './components/data/agenda.json';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


const App = () => {
  const [dataState, setAgendaItems] = useState(data);
  const AddNewItem = (item) => {
    
    console.log("onNewItem " + dataState);
    
    // setAgendaItems(dataState.concat(item));
       
    setAgendaItems((prevAgendaItems) => {
      return prevAgendaItems.concat(item);
    });
  }


  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/agendalist" element={
        <div>
          <AgendaList courseAgendaItems={dataState} onAddItem={AddNewItem}/>
        </div>
      } />
    </Routes>
  </Router>
  );
}

export default App;