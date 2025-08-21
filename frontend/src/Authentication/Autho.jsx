import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../Contexapi/MyContext';
 
function Autho({ onClose }) {
  const [isLogin, setIsLogin] = useState(false); // true = Login, false = SignUp
  const {setUser} = useContext(MyContext);
  const {setIsOn} = useContext(MyContext);

  const semail = useRef();
  const spassword = useRef();
  const srepassword = useRef();

   
  

  const toggleAuthMode = (e) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = semail.current.value;
    const password = spassword.current.value;

    if (!email || !password) {
      return alert("Please fill all required fields");
    }

    const send_data = { email, password };

    if (!isLogin) {
      // Signup mode - check confirm password
      const confirmPassword = srepassword.current.value;
      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }

      try {
        const res = await axios.post('https://notebook-backend-3dhu.onrender.com/register', send_data);
        if (res.status === 200) {
          alert(res.data.message || "Sign up successful!");
          semail.current.value = '';
          spassword.current.value = '';
          if (srepassword.current) srepassword.current.value = '';
          onClose(); // Close modal
        } else {
          alert("Something went wrong during sign up");
        }
      } catch (err) {
        alert(`Sign up failed: ${err.message}`);
      }
    } else {
      // Login mode
      try {
        const res = await axios.post('https://notebook-backend-3dhu.onrender.com/login', send_data);
        if (res.status === 200) {
          const {token,email} = res.data;
          localStorage.setItem("token",token);
          localStorage.setItem("email",email);
          setUser(email);
          setIsOn(true)
           
           
          alert(res.data.message || "Login successful!");
          semail.current.value = '';
          spassword.current.value = '';
           
           
           
          onClose(); // Close modal
           
        } else {
          alert("Something went wrong during login");
        }
      } catch (err) {
        alert(`Login failed: ${err.message}`);
      }
   
    }
  };
   

   
  
  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50'>
      <div className='bg-black text-white w-[500px] p-10 rounded-2xl shadow-2xl space-y-8 relative'>
        <button
          onClick={onClose}
          className='bg-gray-700 cursor-pointer w-10 h-10 rounded-full absolute right-4 top-4 text-white font-bold'
        >
          X
        </button>

        <h2 className='text-3xl font-bold text-center'>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex flex-col'>
            <label>Email</label>
            <input
              type='email'
              ref={semail}
              className='border-2 bg-gray-500 rounded-2xl p-2 text-black'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label>Password</label>
            <input
              type='password'
              ref={spassword}
              className='border-2 bg-gray-500 rounded-2xl p-2 text-black'
              required
            />
          </div>

          {!isLogin && (
            <div className='flex flex-col'>
              <label>Confirm Password</label>
              <input
                type='password'
                ref={srepassword}
                className='border-2 bg-gray-500 rounded-2xl p-2 text-black'
                required
              />
            </div>
          )}

          <button
            type='submit'
            className='cursor-pointer bg-gray-700 w-full py-2 rounded-2xl font-bold'
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className='mt-4 text-center font-light'>
          <span>{isLogin ? "Don’t have an account?" : "Already have an account?"}</span>
          <button
            onClick={toggleAuthMode}
            className='font-bold underline ml-2 cursor-pointer'
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Autho;
