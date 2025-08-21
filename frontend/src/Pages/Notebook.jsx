import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../Card';
const Notebook = () => {

    const [Data, setData] = useState([])

    useEffect(() => {
    axios
      .get('https://notebook-backend-3dhu.onrender.com/get')
      .then((res) => setData(res.data))
      .catch((err) =>
        console.log(`Error occurred while getting the result: ${err}`)
      );
    });

   
  return (
      <div className=" bg-gradient-to-r from-blue-200 via-blue-300 to-purple-300 p-4 rounded-lg shadow-lg min-h-screen">
       <ul className="grid gap-4 bg-white/70 p-4 rounded-lg shadow-md">
          {Data.map((item, index) => (
            <li key={index}>
              <Card userInfo={item} />
            </li>
          ))}
        </ul>
      </div>
  )
}

export default Notebook
