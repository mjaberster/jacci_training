import React, {useState} from 'react';
import AgendaList from './components/agenda-list/AgendaList';
import Home from './components/Home'
import data from './components/data/agenda.json';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainNavigation from './components/navigation/MainNavigation';
import UsersList from './components/users/UsersList';
import StudentCourseList from './components/course/student-courses';
import AuthForm from './components/auth/AuthForm';
import { UserContext } from './context/UserContext';
import { Login, Logout } from './components/auth/login';

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
            <UserContext.Provider value={{isLogedIn: false,
                                          token: null,
                                          loginStatus: null,
                                          loginMsg: "",
                                          login: Login,
                                          logout: Logout}}>
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
              </UserContext.Provider>
          </main>
        
      </Router>
  );
}

export default App;