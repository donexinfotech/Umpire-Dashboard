import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useAuth();  // Use the logout function from context
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-br from-green-600 via-green-700 to-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-center gap-8 items-center">
        <div className="text-xl font-bold">Umpire App</div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          {user ? (
            <>
              <Link to="/umpires" className="hover:text-blue-200">Umpires List</Link>
              {/* Dropdown Button */}
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center space-x-2 hover:text-blue-200"
                >
                  <FaUserCircle className="w-6 h-6 text-black" />
                  <span className="text-black">{user.email}</span>
                  <FaChevronDown className={`transition-transform ${showDropdown ? 'rotate-180' : 'rotate-0'} text-black`} />
                </button>
                {showDropdown && (
                  <div className="absolute left-30 mt-2 w-48 bg-white shadow-lg border border-gray-300 rounded">
                    <button
                      onClick={logout}  // Call logout when button is clicked
                      className="flex items-center p-2 hover:bg-gray-100 w-full text-left text-black"
                    >
                      <FaSignOutAlt className="mr-2 text-black" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Dropdown for non-logged in users */}
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center space-x-2 hover:text-blue-200"
                >
                  <FaUserCircle className="w-6 h-6 text-black" />
                  <span className="text-black">Account</span>
                  <FaChevronDown className={`transition-transform ${showDropdown ? 'rotate-180' : 'rotate-0'} text-black`} />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-300 rounded">
                    <Link
                      to="/login"
                      className="flex items-center p-2 hover:bg-gray-100 border-b border-gray-200 text-black"
                    >
                      <FaSignOutAlt className="mr-2 text-black" /> Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center p-2 hover:bg-gray-100 border-b border-gray-200 text-black"
                    >
                      <FaSignOutAlt className="mr-2 text-black" /> Register
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
