const mongoose = require("mongoose");

const URI = "mongodb+srv://donexinfotech:2311@cluster0.j4oac.mongodb.net/umpire_dashboard_c2?retryWrites=true&w=majority&appName=Cluster0";


const connectDb = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("Connection Successfull")
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = connectDb;