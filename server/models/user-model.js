const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAvailable: {
        type: Boolean,
        default: false,
    },
    reviews: {
        type: [Number], // Array to store star ratings
        default: [],
    },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(user.password, salt);
        user.password = passwordHash;
    } catch (error) {
        next(error);
    }
});

// Generate JWT token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            "DONEXIT",
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.log(error);
    }
};

userSchema.methods.getAverageRating = function () {
    const total = this.reviews.reduce((sum, rating) => sum + rating, 0);
    return this.reviews.length ? (total / this.reviews.length).toFixed(1) : 0;
};

// Define model
const User = mongoose.model("User", userSchema);

module.exports = User;
