const express = require("express");
const User = require("../models/user-model"); // Import User model


const review = async (req, res) => {
    const { userId, rating } = req.body;

    if (!userId || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.reviews.push(rating); // Add rating to the reviews array
        await user.save();

        res.status(200).json({ message: "Rating added successfully", averageRating: user.getAverageRating() });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const reviewUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ averageRating: user.getAverageRating() });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


module.exports = {review, reviewUser}