const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  Home,
  signup,
  login,
  deleteUser,
  updateUserStats,
  GetUserProfile,
  getUserDataFromDB,
  getUser,
} = require("./Controllers/routesController");
const ConnectDB = require("./LeetcodeDB");
const app = express();
require("dotenv").config();

// Middlewears Use
app.use(bodyParser.json());
var corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  methods: "GET, PUT, PATCH, DELETE, POST, HEAD",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 


// Routes
app.route("/").get(Home);
app.route("/profile/:username/:id?").get(GetUserProfile); // web se user stats
app.route("/getuserdata/:id?").get(getUserDataFromDB); // db se user stats
app.route("/user/:id?").get(getUser); // db se user data

app.route("/login").post(login);
app.route("/signup").post(signup);

app.route("/profile/:username/:id?").put(updateUserStats); //web se

app.route("/delete/:id?").delete(deleteUser);

// Connection
const PORT = process.env.SERVER_PORT || 3000;
ConnectDB().then(
  app.listen(PORT, () => {
    console.log(`server is live at port ${PORT}`);
  })
);
