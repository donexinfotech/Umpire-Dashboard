import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Availability() {
    const [isAvailable, setIsAvailable] = useState(true);

    const handleAvailabilityChange = (event) => {
        setIsAvailable(event.target.id === 'option1');
        console.log(isAvailable)
    };

    const submitAvailability = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/availablity/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Authorization header with JWT
                },
                body: JSON.stringify({ isAvailable }),
            });

            if (!response.ok) {
                throw new Error('Failed to update availability');
            }

            const data = await response.json();
            toast.success(`${data.message}`)
        } catch (error) {
            console.error('Error updating availability:', error);
        }
    };


    return (
        <div className="avail mb-5">
            <p className='font-bold mb-3'>Are You Available This Weekend?</p>
            <div id="firstFilter" className="filter-switch">
                <input
                    checked={isAvailable}
                    id="option1"
                    name="options"
                    type="radio"
                    onChange={handleAvailabilityChange}
                />
                <label className="option" htmlFor="option1">Available</label>

                <input
                    checked={!isAvailable}
                    id="option2"
                    name="options"
                    type="radio"
                    onChange={handleAvailabilityChange}
                />
                <label className="option" htmlFor="option2">Not Available</label>

                <span className="background"></span>
            </div>
            <button
                className="mt-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-2 px-4 rounded shadow-lg hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-half"
                onClick={submitAvailability}
            >
                Update Availability
            </button>

        </div>
    );
}

export default Availability;
