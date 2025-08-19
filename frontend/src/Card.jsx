import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from './Contexapi/MyContext';


function Card({userInfo}) {

    const navigate = useNavigate();
    const {setInfo} = useContext(MyContext)
    const addinfo = userInfo.number;
    const forFront = addinfo.slice(0,50);
    function handledelete(id) {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => console.log('happy happy.'))
            .catch((err) => console.log(`faizansheikh ${err}`) )
    };
    function handleupdate(id){
        navigate(`/update/${id}`)

    };
    function handleSeeMore(){
        navigate('/Seemore');
    }
    useEffect(()=>{
        setInfo(addinfo)
    })
    return(
    <div className=' flex border-gray-500 border-1'>
         <div className='grid border-2 w-full rounded-2xl shadow-2xl p-2 m-2'>
            <div>
                <strong>Name:-</strong>
                <span>{userInfo.name}</span>
            </div> 

            <div>
                <strong>Email:-</strong>
                <span>{userInfo.email}</span>
            </div> 
            
            <div>
                <strong>Note:-</strong>
                <span>{forFront}...</span>
                <button onClick={()=>handleSeeMore()}><strong>See more</strong></button>
            </div> 
             
        </div>
        <div className='space-y-8 text-white m-3'>
            <button className='bg-black w-20 h-10 rounded-2xl shadow-2xl cursor-pointer' onClick={() => handledelete(userInfo._id)}>Delete</button>
            <button className='bg-black w-20 h-10 rounded-2xl shadow-2xl cursor-pointer' onClick={()=> handleupdate(userInfo._id)}>Edit</button>
        </div>
    </div>
  )
}

export default Card