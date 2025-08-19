import React, {   useContext, useEffect, useState } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import Autho from './Authentication/Autho'
import Profile from './Authentication/Profile';
import axios from 'axios';
import { MyContext } from './Contexapi/MyContext';

const Navbar = () => {
  const [Sahi, setSahi] = useState(false);
  const [CheckProfile, setCheckProfile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert('Please log in first');
      return;
    }

    axios.get('http://localhost:3001/Profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res.data);
      setCheckProfile(true);
    })
    .catch((err) => { 
      console.log(CheckProfile, err);
      setCheckProfile(false);
    });
  }, []);

  const {isOn,setIsOn} = useContext(MyContext)
  
  console.log('this is context api',isOn)
  const navigate = useNavigate()
  const handleContext = ( )=>{
    
    if(!isOn){ 
    
      alert('Please Login for open this Tab');
      navigate('/')
    }
    console.log('function is running')
    }
  return (
    <div>
      <nav className='bg-gradient-to-r from-blue-200 via-blue-300 to-purple-300  h-20 flex items-center font-bold text-2xl justify-between'>
        <div className='flex items-center text-2xl font-bold space-x-10 p-2'>
          <Link to="/" style={{ marginRight: 10 }}>Home</Link>
          <div onClick={()=>{handleContext()}}><Link to="/Create"   >Create</Link></div>
           <div onClick={()=>{handleContext()}}><Link to="/Notebook" >Notebook</Link></div>
          <Link to="/About" style={{ marginRight: 10 }}>About</Link>
        </div>
        <div>
          {isOn ? (
             <Profile onClose={()=>setIsOn(false)} />
          ) : (
            <button   onClick={() => setSahi(!Sahi)} className="cursor-pointer font-medium text-[22px]">
              Login or SignUp
            </button>
          )}
        </div>
      </nav>

      {Sahi && <Autho onClose={() => setSahi(false)} />}
    </div>
  );
}

export default Navbar;
