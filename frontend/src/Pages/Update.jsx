import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const Name = useRef();
  const Email = useRef();
  const Number = useRef();

  function handleUpdate() {
    // ✅ Use `const` for the data object
    const data = {
      name: Name.current.value,
      email: Email.current.value,
      number: Number.current.value
    };

    // ✅ Try/catch is good, but no need if using promise `.then().catch()`
    axios.put(`http://localhost:3001/update/${id}`, data)
      .then(() => {
        alert('Update has been successfully completed, please wait for a while');
        setTimeout(() => {
          navigate('/Notebook');
        }, 3000);
      })
      .catch((err) => {
        alert(`Update did not complete due to: ${err}`);
      });
  }

  return (
    <div className='bg-gradient-to-r from-blue-200 via-blue-300 to-purple-300 min-h-screen p-10 space-y-10'>
      <div className='space-x-5 text-2xl'>
        <span>Rewrite Name :-</span>
        <input
          type="text"
          ref={Name}
          className='border-2 w-auto p-3 h-13 rounded-2xl'
        />
      </div>

      <div className='space-x-5 text-2xl'>
        <span>Rewrite Email :-</span>
        <input
          type="text"
          ref={Email}
          className='border-2 w-auto p-3 h-13 rounded-2xl'
        />
      </div>

      <div className='space-x-5 text-2xl'>
        <span>Rewrite Number :-</span>
        <input
          type="text"
          ref={Number}
          className='border-2 w-auto p-3 h-13 rounded-2xl'
        />
      </div>

      <button
        className='bg-black text-white w-20 h-10 rounded-2xl font-bold cursor-pointer'
        onClick={handleUpdate}
      >
        Submit
      </button>
    </div>
  );
};

export default Update;
