import React, { useContext } from 'react'
import { MyContext } from '../Contexapi/MyContext'

const Seemore = () => {
  const {Info} = useContext(MyContext);
  return (
    <div className=' bg-gradient-to-r from-blue-200 via-blue-300 to-purple-300 p-4 min-h-screen'>
        <div className=' border-2 h-150 rounded-2xl border-white text-black p-10'>
              {Info}
        </div>
    </div>
  )
}

export default Seemore