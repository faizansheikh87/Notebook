import {  useRef } from 'react';
import axios from 'axios';
import Card from '../Card';
const Create = () => {
   

  const Fname = useRef();
  const Femail = useRef();
  const Fnumber = useRef();

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: Fname.current.value,
      email: Femail.current.value,
      number: Fnumber.current.value,
    };

    try {
      const res = await axios.post('http://localhost:3001/add', data);
      console.log('Server response:', res.data);
      alert('Form submitted successfully');

      // Clear inputs
      Fname.current.value = '';
      Femail.current.value = '';
      Fnumber.current.value = '';

      // Update list after adding new item
      
    } catch (err) {
      console.log('Error sending the data to backend:', err);
    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-200 via-blue-300 to-purple-300 min-h-screen '>
       <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-purple-400 rounded-2xl p-6 w-150 items-center justify-center absolute top-50 left-50">
      <h1 className='font-bold text-2xl'>Add the your Note here....</h1>

      <div className="border-2 rounded-[20px] flex justify-center p-6">
        <form onSubmit={handleSubmit} className="grid font-bold text-2xl gap-4">
          <span>Name</span>
          <input
            type="text"
            ref={Fname}
            className="shadow-2xl border-2 rounded-2xl w-70 h-10 p-2"
            required
          />

          <span>Email</span>
          <input
            type="email"
            ref={Femail}
            className="shadow-2xl border-2 rounded-2xl w-70 h-10 p-2"
            required
          />

          <span>Note</span>
          <textarea
            ref={Fnumber}
            className="shadow-2xl border-2 rounded-2xl w-72 h-40 font-light text-[20px] p-2 resize-none overflow-auto"
            required
          />


          <button
            type="submit"
            className="border-red-500 w-20 rounded-2xl shadow-2xl bg-black text-white font-bold h-10 m-4 hover:cursor-pointer"
          >
            Add
          </button>
        </form>
      </div>

    </div>
    </div>    
     
  );
};

export default Create;
