import Navbar from './Navbar';
import Home from './Pages/Home';
import Notebook from './Pages/Notebook';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Pages/About';
import Update from './Pages/Update';
import Create from './Pages/Create';
import { useState } from 'react';
import { MyContext } from './Contexapi/MyContext';
import Seemore from './Pages/Seemore';
const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [Info, setInfo] = useState('');
  const [User,setUser] = useState('');
  return (
    <MyContext.Provider value={{ isOn, setIsOn,Info,setInfo,User,setUser }}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Notebook" element={<Notebook />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Seemore" element={<Seemore/>}/>
            
          </Routes>
        </div>
      </Router>
    </MyContext.Provider>
  );
};

export default App;
