const User = require("../models/user-model")

const Available = async (req, res) => {
    try {
        const data = req.body
        const userId = req.userID

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No data provided for update." });
        }

        const updatedData = await User.updateOne(
            {_id : userId}, 
            {
            $set : data,
        }
        )

        res.status(200).json({
            message :  `${data.isAvailable}`
        })

    } catch (error) {
        console.log(error)
    }
}

const getAllUmpires = async (req, res)=>{
    try {
        const umpires = await User.find()

        res.status(200).json(umpires)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {Available, getAllUmpires}