// src/pages/UmpiresList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function UmpiresList() {
  const [umpires, setUmpires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth(); // Get user data from context

  useEffect(() => {
    if (user) {
      const fetchUmpires = async () => {
        try {
          // Make the GET request to the backend
          const response = await axios.get('http://localhost:5000/api/availablity/get', {
            headers: {
              Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
            },
          });

          setUmpires(response.data); // Update state with the response data
        } catch (err) {
          setError('Failed to fetch umpire data.');
          console.error('Error fetching umpire data:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchUmpires();
    }
  }, [user]); // Only run this effect if the user data is available

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center">Umpires List</h2>
      <div className="mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Availability</th>
            </tr>
          </thead>
          <tbody>
            {umpires.map((umpire, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{umpire.username}</td>
                <td className="border px-4 py-2">{umpire.email}</td>
                <td className="border px-4 py-2">{umpire.phone}</td>
                <td className="border px-4 py-2">{umpire.isAvailable ? 'Available' : 'Not Available'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UmpiresList;
