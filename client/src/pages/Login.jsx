import { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa'; // Importing icons for user and lock
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useAuth(); // Get setUser function from context to update the user state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // On successful login, store the token and user data
      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // Set user data to context
      setUser({
        token,
        userId,
        email,
      });
      navigate('/umpires'); // Redirect to Umpires List page
      toast.success("Loggedin Succesfully")
    } catch (err) {
      toast.error(error)
      setError('Invalid email or password.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Login</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaUserAlt className="text-gray-400 mr-3" />
            <input
              type="email"
              id="email"
              className="w-full p-2 border-none focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              id="password"
              className="w-full p-2 border-none focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <span>Don't have an account? </span>
            <a href="/register" className="text-blue-500 font-semibold">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
