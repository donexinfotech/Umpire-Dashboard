const User = require("../models/user-model")
const bcrypt = require("bcryptjs")

const login = async (req, res)=>{
    try {
        const {email, password} = req.body;

        const userExists = await User.findOne({email});
        if(!userExists){
            return res.status(401).json({
                "Error": "Invalid email",
            })
        }

        const user = await bcrypt.compare(password, userExists.password);

        if(user){
            res.status(200).json({
                "Message": "Loggedin Successfully", 
                "token": await userExists.generateToken(),
                "userId" : userExists._id.toString(),
            });
        }else{
            res.status(401).json({
                "message": "Invalid password"});
        }

    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res)=>{
    try {
        const {username, email, phone, password} = req.body

        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(400).json({
                "message": "Email already exists"
            });
        }

        const userCreated = await User.create({username, email, phone, password});

        res.status(201).json({
            "Message": "User registered Successfully", 
            "token": await userCreated.generateToken(),
            "userId" : userCreated._id.toString(),
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {login, register}