import React, {useState} from 'react';
import './App.css';
import AgendaList from './components/agenda-list/AgendaList';
import Home from './components/Home'
import data from './components/data/agenda.json';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainNavigation from './components/navigation/MainNavigation';
import UsersList from './components/users/UsersList';
import StudentCourseList from './components/course/student-courses';
const App = () => {
  const [dataState, setAgendaItems] = useState(data);
  const AddNewItem = (item) => {
    
    console.log("onNewItem " + dataState);
           
    setAgendaItems((prevAgendaItems) => {
      return prevAgendaItems.concat(item);
    });
  }


  return (
    <Router>
        <MainNavigation />
        <main>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/courses" element={
                <div>
                  <AgendaList courseAgendaItems={dataState} onAddItem={AddNewItem}/>
                </div>
              } />
              <Route path="/students" element={
                <div>
                  <UsersList />
                </div>
              } />
              <Route path="/student/:studentid" element={
                <StudentCourseList/>
              } />
            </Routes>
        </main>
      </Router>
  );
}

export default App;