import React from 'react';

const About = () => {
  return (
    <div className="  bg-gradient-to-r from-blue-200 via-blue-300 to-purple-300 p-25  shadow-2xl flex flex-col items-center text-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Me</h1>
      <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
        I’m <span className="font-semibold text-purple-700">Sheikh Faizan</span>, 
        a passionate <span className="font-semibold">Software Developer</span> with expertise in 
        <span className="font-semibold"> Python</span>, <span className="font-semibold">Data Structures & Algorithms</span>, and 
        <span className="font-semibold"> Web Development in MERN</span>. I enjoy building scalable, efficient, and user-friendly applications, 
        and have experience with projects like AI voice assistants, stock market prediction models, 
        and interactive DSA visualizers.
      </p>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed max-w-3xl">
        I’m also an active competitive programmer, always seeking to solve challenging problems 
        and optimize solutions. Beyond coding, I enjoy gaming and strategy-based challenges.
      </p>
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <a 
          href="https://portfolio-rose-nine-94.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition duration-300"
        >
          View Portfolio
        </a>
        <a 
          href="https://leetcode.com/u/faizan_sheikh/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          LeetCode Profile
        </a>
        <a 
          href="https://www.linkedin.com/in/faizan-sheikh-373136291" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition duration-300"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default About;
