import { ThemeContext } from './context/ThemeContext';
import './App.css';
import StudentsList from './components/students/studentList';
import { useState } from 'react';
import SignIn from './components/auth/Signin';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  const [darkTheme, setDarkTheme] = useState(false)

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }


  return <Router>
          <Routes>
            <Route path="/" element={<SignIn />}/>
            <Route path="/students" element={
              <div className="App">
              <button onClick={toggleTheme} >Toggle Theme</button>
              <ThemeContext.Provider value={darkTheme}>
                <StudentsList />
              </ThemeContext.Provider>
          </div>
            }/>
          </Routes>
      </Router>

}

export default App;
