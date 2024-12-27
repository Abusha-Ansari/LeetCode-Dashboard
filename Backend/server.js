const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Home, fetchUserData, signup, login, deleteUser, updateUserStats } = require('./Controllers/routesController');
const ConnectDB = require('./LeetcodeDB');
const app = express();
require('dotenv').config();


// Middlewears Use
app.use(bodyParser.json());
var corsOptions = {
    origin: process.env.FRONTEND_ORIGIN,
    methods: "GET, PUT, PATCH, DELETE, POST, HEAD",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
app.use(cors(corsOptions))


// Routes
app.route('/').get(Home)
app.route('/getUserStats').post(fetchUserData);
app.route('/login').post(login);

app.route('/signup').post(signup);

app.route('/delete/:id?').delete(deleteUser);

app.route('/updatestats').put(updateUserStats);


// Connection
const PORT = process.env.SERVER_PORT;
ConnectDB().then(
  app.listen(PORT,()=>{
    console.log(`server is live at port ${PORT}`)
})
);