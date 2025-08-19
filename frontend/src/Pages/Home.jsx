import React, { useContext } from 'react'
import { MyContext } from '../Contexapi/MyContext'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate()
  const {isOn} = useContext(MyContext);
  const handleClick=()=>{
    if (isOn){
      navigate('/Create')
    }
    else{
      alert('please login first')
    }
  }
  return (
      <div className="flex text-white  bg-gradient-to-r from-blue-200 via-blue-300 to-purple-300  justify-between min-h-screen">
        <div className=' space-y-10 '>
            <h1 className="text-8xl font-bold  text-center pt-20">
              Welcome to The Notebook Apk 📓
            </h1>
            <p className="text-cente text-4xl mt-4 ml-15">
              Write, Organize, and Access your notes anytime, anywhere.
            </p>
            <div className='w-100 h-20 absolute left-80 mt-10 '>
              <button onClick={() => handleClick()} 
               className='bg-white text-black text-3xl p-2 rounded-2xl font-bold '
              >Create Your First Note</button>
            </div>
        </div >
        <div className='p-10'>
          <img className='h-150 w-180' src="/src/assets/ChatGPT Image Aug 12, 2025, 02_11_58 AM.png" alt="" />
        </div>
         
      </div>
  )
}

export default Home