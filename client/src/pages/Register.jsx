import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa'; // Font Awesome Icons
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://umpire-dashboard-backend.vercel.app/api/auth/register', {
        username,
        email,
        phone,
        password,
      });

      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      setUser({
        token,
        userId,
        email,
      });

      navigate('/umpires');
      toast.success('Registered Successfully');
    } catch (err) {
      toast.error('Failed to register. Email may already be in use.');
      setError('Failed to register. Email may already be in use.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <div className="flex items-center">
            <FaUser className="absolute ml-3 text-gray-500" />
            <input
              type="text"
              id="username"
              className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="flex items-center">
            <FaEnvelope className="absolute ml-3 text-gray-500" />
            <input
              type="email"
              id="email"
              className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="relative">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <div className="flex items-center">
            <FaPhone className="absolute ml-3 text-gray-500 -scale-x-100" />
            <input
              type="text"
              id="phone"
              className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="flex items-center">
            <FaLock className="absolute ml-3 text-gray-500" />
            <input
              type="password"
              id="password"
              className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
        <div className="text-center">
          Already Registered?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
