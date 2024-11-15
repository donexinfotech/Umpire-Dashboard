// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-green-600 to-blue-500 bg-opacity-60 grid place-items-center">
      <div className="text-center p-8 bg-white bg-opacity-70 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Umpire App</h1>
        <p className="text-lg text-gray-600 mb-6">
          Here you can manage umpire availability, stay updated with schedules. Join us today to simplify your umpiring experience!
        </p>
        <Link to="/register">
          <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
