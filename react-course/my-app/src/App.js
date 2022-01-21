import React, {useState, useEffect} from 'react';
import './App.css';
import AgendaList from './components/agenda-list/AgendaList';
import Home from './components/Home'
import data from './components/data/agenda.json';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainNavigation from './components/navigation/MainNavigation';
import UsersList from './components/users/UsersList';
import StudentCourseList from './components/course/student-courses';
import AuthForm from './components/auth/AuthForm';


const App = () => {
  const [count, setCount] = useState(0);
    useEffect(()=>{
        setCount(count+1)
    }, [])
    
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
        <label>{count}</label>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/course" element={
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
              <Route path="/auth" element={
                <AuthForm/>
              } />
            
            </Routes>
        </main>
      </Router>
  );
}

export default App;