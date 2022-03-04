import React, {useEffect, useState} from 'react';
import AgendaList from './components/agenda-list/AgendaList';
import Home from './components/Home'
import data from './components/data/agenda.json';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainNavigation from './components/navigation/MainNavigation';
import UsersList from './components/users/UsersList';
import StudentCourseList from './components/course/student-courses';
import AuthForm from './components/auth/AuthForm';
import { UserContext } from './context/UserContext';
import { GoogleLogin, GoogleLogout, Login, Logout } from './components/auth/login';
import RegistrationForm from './components/registration/registeration';
import SignIn from './components/auth/Signin';

const App = () => {
  
  const [token, setToken] = useState(null)
  const [googleUser, setGoogleUser] = useState(null)
  const [dataState, setAgendaItems] = useState(data);
  const [refreshLoginState, setRefreshLoginState] = useState(false)
  const AddNewItem = (item) => {
    
    console.log("onNewItem " + dataState);
           
    setAgendaItems((prevAgendaItems) => {
      return prevAgendaItems.concat(item);
    });
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"))
    if(!token) {
      setGoogleUser(localStorage.getItem("googleUser"))
    }
  }, [refreshLoginState])
  
  const updateRefreshLoginState = () => {
    setRefreshLoginState(!refreshLoginState)
  }
  
  return (
    <Router>
      
        <MainNavigation />
          <main>
            <UserContext.Provider value={{isLogedIn: !!token || !!googleUser,
                                          token: token,
                                          googleUser: googleUser,
                                          loginStatus: null,
                                          loginMsg: "",
                                          login: Login,
                                          logout: Logout,
                                          googleLogin: GoogleLogin,
                                          googleLogout: GoogleLogout,
                                          refreshLoginState: updateRefreshLoginState}}>
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/course" element={
                    <div>
                      <AgendaList courseAgendaItems={dataState} onAddItem={AddNewItem}  />
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
                    <SignIn/>
                  } />
                  <Route path="/register" element={
                    <RegistrationForm />
                  } />
                </Routes>
              </UserContext.Provider>
          </main>
        
      </Router>
  );
}

export default App;