const express = require('express')
const app = express()
const connectDb = require("./utils/db")
const cors = require("cors");
const authRoute = require("./router/Auth-router")
const availabilityRoute = require('./router/Availablity-router')
const reviewRoute = require("./router/Reviews-router")

app.use(cors({
    origin: '*',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
    allowedHeaders: 'Content-Type,Authorization'
}))

app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/availablity", availabilityRoute)
app.use("/api/reviews", reviewRoute)


const PORT = 5000;
connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running on port: ${PORT}`);
    });
});