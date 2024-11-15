import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ user }) => {
  const { username, email, first_name, last_name, phone, isAvailable } = user;

  const [avgRating, setAvgRating] = useState(0); // State to store average rating
  const [userReview, setUserReview] = useState(null); // State for user's submitted rating

  useEffect(() => {
    // Fetch average rating from the backend
    const fetchAvgRating = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${user._id}`);
        setAvgRating(response.data.averageRating); // Update state with the average rating
      } catch (err) {
        console.error('Failed to fetch average rating', err);
      }
    };

    fetchAvgRating();
  }, [user._id]);

  const handleRatingSubmit = async (rating) => {
    try {
      await axios.post(`http://localhost:5000/api/reviews`, {
        userId: user._id,
        rating,
      });
      setUserReview(rating);
      setAvgRating((prev) => ((prev * user.reviews.length + rating) / (user.reviews.length + 1)).toFixed(1)); // Update locally
    } catch (err) {
      console.error('Failed to submit review', err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="flex justify-center items-center h-32 bg-gradient-to-r from-green-400 to-green-600 text-white text-4xl font-bold">
        {username ? username[0].toUpperCase() : 'U'}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">{username}</h2>

        <div className="space-y-4">
          <p className="text-gray-600">
            <span className="font-semibold">Full Name:</span> {first_name} {last_name}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone:</span> {phone}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Availability:</span> {isAvailable ? 'Available' : 'Not Available'}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Average Rating:</span> {avgRating} / 5
          </p>

          <div className="rating">
            {[5, 4, 3, 2, 1].map((star) => (
              <label key={star}>
                <input
                  type="radio"
                  name="star-radio"
                  value={star}
                  onClick={() => handleRatingSubmit(star)}
                  disabled={!!userReview} // Disable after one review
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                    fill={star <= avgRating ? 'gold' : 'none'} // Fill gold for stars <= avgRating
                    stroke="gold" // Outline the unfilled stars
                    strokeWidth="1.5"
                  />
                </svg>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
