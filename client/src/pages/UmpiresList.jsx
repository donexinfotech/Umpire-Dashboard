import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaDotCircle, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"; // Import stars
import UserProfile from './UserProfile'; // Assuming UserProfile component is in the same folder

function UmpiresList() {
  const [umpires, setUmpires] = useState([]);
  const [selectedUmpire, setSelectedUmpire] = useState(null); // For selected user profile
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth(); // Get user data from context

  useEffect(() => {
    if (user) {
      const fetchUmpires = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/availablity/get', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          // Assuming the response includes umpire data with ratings
          const umpireData = await Promise.all(
            response.data.map(async (umpire) => {
              const ratingResponse = await axios.get(`http://localhost:5000/api/reviews/${umpire._id}`);
              return {
                ...umpire,
                avgRating: ratingResponse.data.averageRating || 0, // Add average rating to each umpire
              };
            })
          );
          setUmpires(umpireData); // Update state with the response data
        } catch (err) {
          setError('Failed to fetch umpire data.');
          console.error('Error fetching umpire data:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchUmpires();
    }
  }, [user]);

  // Open modal with the selected umpire data
  const openUserProfile = (umpire) => {
    setSelectedUmpire(umpire);
  };

  // Close modal
  const closeModal = () => {
    setSelectedUmpire(null);
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <>
        {Array(fullStars).fill(<FaStar style={{ color: 'gold' }} />)}
        {halfStar && <FaStarHalfAlt style={{ color: 'gold' }} />}
        {Array(emptyStars).fill(<FaRegStar style={{ color: 'gold' }} />)}
      </>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-8 mx-5 h-screen">
      <h2 className="text-2xl font-bold text-center">Umpires List</h2>
      <div className="mt-4">
        <table className="w-full bg-white border-collapse card shadow-lg">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Availability</th>
              <th className="border px-4 py-2">Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {umpires.map((umpire, index) => (
              <tr key={index}>
                <td
                  className="border px-4 py-2 text-blue-500 cursor-pointer hover:underline"
                  onClick={() => openUserProfile(umpire)}
                >
                  {umpire.username}
                </td>
                <td className="border px-4 py-2">{umpire.email}</td>
                <td className="border px-4 py-2">{umpire.phone}</td>
                <td className="border px-4 py-2">
                  {umpire.isAvailable ? (
                    <FaDotCircle style={{ color: 'green' }} />
                  ) : (
                    <FaDotCircle style={{ color: 'red' }} />
                  )}
                </td>
                <td className="border px-4 py-2">
                  {/* Display stars based on the average rating */}
                  <div className="flex">
                    {renderStars(umpire.avgRating)} {/* Show star ratings */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for User Profile */}
      {selectedUmpire && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <button className="absolute top-2 right-2 text-gray-600" onClick={closeModal}>
              &times;
            </button>
            <UserProfile user={selectedUmpire} /> {/* Pass selected umpire to UserProfile */}
          </div>
        </div>
      )}
    </div>
  );
}

export default UmpiresList;
