import React, {   useState } from 'react'
import MyPhoto from "/src/assets/user.png"
import { MyContext } from '../Contexapi/MyContext';
import { useContext } from 'react';


const Profile = ({onClose}) => {

  const {User} = useContext(MyContext)
  
  const [Ct,setCt] = useState(false);

  const new_user = User.slice(0,10);
  const handleLogout=()=>{
  
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    onClose();
  };
  const email = localStorage.getItem("email");
  console.log(email,'hi')
  return (
 
     <div className= 'fixed top-3 right-1 space-y-3'>
        <div onClick={()=> Ct?setCt(false):setCt(true)} className='flex items-center p-2 space-x-2 cursor-pointer '>
            <img className='rounded-full w-10 h-10 border-2 ' src={MyPhoto} alt="" /> 
            <div className='font-light '>{User?new_user:"user"}</div>
        </div>
        <div className='cursor-pointer '>
            {Ct&&(<div onClick={()=>handleLogout()} className='text-red-500'>
                Logout
            </div>) }
        </div>
     </div>
  )
}

export default Profile