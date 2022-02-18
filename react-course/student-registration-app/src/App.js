import { ThemeContext } from './context/ThemeContext';
import './App.css';
import StudentsList from './components/students/studentList';
import { useState } from 'react';

function App() {

  const [darkTheme, setDarkTheme] = useState(false)

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }


  return <div className="App">
            <button onClick={toggleTheme} >Toggle Theme</button>
            <ThemeContext.Provider value={darkTheme}>
              <StudentsList />
            </ThemeContext.Provider>
        </div>

}

export default App;
