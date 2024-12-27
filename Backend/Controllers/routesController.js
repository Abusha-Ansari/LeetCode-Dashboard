const axios = require("axios");
const Z = require("zod");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const { dbSchema, userStatsSchema } = require("../Schema/leetCodeSchema");
const bcrypt = require("bcrypt");

const Home = (req, res) => {
  res.status(200).send("Welcome to Digital Wallet");
};

const fetchUserData = async (req, res) => {
  try {
    //* GET DATA FROM BODY FROM FRONTEND
    const username = req.body.username;
    const ID = req.body.userID;
    if (!username) {
      res.status(400).send("Enter username");
    } else {
      const userData = await axios.get(
        `https://leetcode-stats-api.herokuapp.com/${username}`
      );
      const existingUser = await userStatsSchema.findOne({ userId: ID });
      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message:
            "User Data with this ID already exists please refresh the Stats",
        });
      }
      if (userData && userData.data.status === "success") {
        const LeetcodeData = userData.data;
        const Format_Details = {
          userId: ID,
          total_Solved: LeetcodeData.totalSolved,
          total_Questions: LeetcodeData.totalQuestions,
          total_Questions_EASY: LeetcodeData.totalEasy,
          total_Questions_MEDIUM: LeetcodeData.totalMedium,
          total_Questions_HARD: LeetcodeData.totalHard,
          total_Solved_EASY: LeetcodeData.easySolved,
          total_Solved_MEDIUM: LeetcodeData.mediumSolved,
          total_Solved_HARD: LeetcodeData.hardSolved,
          acceptance_rate: LeetcodeData.acceptanceRate,
          Ranking: LeetcodeData.ranking,
          submissions: LeetcodeData.submissionCalendar,
          updatedTime: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
          }),
        };

        const FinalUserData = new userStatsSchema(Format_Details);
        await FinalUserData.save();
        return res.status(200).send({message:"Data fetched succesfully", data:Format_Details});
      } else
        res
          .status(404)
          .send(`leetcode user with username: ${username} not found`);
    }
  } catch (error) {
    res.status(200).send("failed to fetch user data");
  }
};

const updateUserStats = async (req, res) => {
  try {
    //* GET DATA FROM BODY FROM FRONTEND
    const username = req.body.username;
    const ID = req.body.userID;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
      res.status(403).send("Invalid ID format")
    }

    if (!username) {
      res.status(400).send("Enter username");
    } 
    else {
      const userData = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const existingUser = await userStatsSchema.findOne({ userId: ID });

      if (userData && userData.data?.status === "success" && existingUser) {

        const LeetcodeData = userData.data;

        const Format_Details = {
          userId: ID,
          total_Solved: LeetcodeData.totalSolved || 0,
          total_Questions: LeetcodeData.totalQuestions || 0,
          total_Questions_EASY: LeetcodeData.totalEasy || 0,
          total_Questions_MEDIUM: LeetcodeData.totalMedium || 0,
          total_Questions_HARD: LeetcodeData.totalHard || 0,
          total_Solved_EASY: LeetcodeData.easySolved || 0,
          total_Solved_MEDIUM: LeetcodeData.mediumSolved || 0,
          total_Solved_HARD: LeetcodeData.hardSolved || 0,
          acceptance_rate: LeetcodeData.acceptanceRate || 0,
          Ranking: LeetcodeData.ranking || 0,
          submissions: LeetcodeData.submissionCalendar || {},
          updatedTime: moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
        };

        try {
          const updatedData = await userStatsSchema.findByIdAndUpdate(
            existingUser._id.toString(),
            Format_Details,
            { new: true, runValidators: true }
          );

          if (!updatedData) {
            res.status(403).send("No user found with the provided ID")
          }
          // Updated succesfully
          res.status(200).send("Update Succesfull");
        } catch (error) {
          res.status(400).send("error in update", error.message);
        }
      } else {
        res.status(400).send("Invalid input data or user does not exist");
      }
    }
  } catch (error) {
    res.status(200).send("failed to update data");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const own_user = await dbSchema.findByIdAndDelete(id);
    if (!own_user) {
      res.status(404).send("Invalid user id");
    } else {
      res.status(200).send("User deleted succesfully");
    }
  } catch (error) {
    res.status(200).send("User cannot be deleted");
  }
};

const signup = async (req, res) => {
  const signupSchema = Z.object({
    username: Z.string(),
    email: Z.string().email("Invalid email format"),
    password: Z.string()
      .min(8, "Password must be at least 8 characters")
      .max(32),
    college: Z.string(),
  });

  try {
    const parseData = signupSchema.safeParse(req.body);
    if (!parseData.success == "true") {
      res.status(400).send("invalid details");
    } else {
      const userData = req.body;
      const { email } = req.body;

      const ExistingUser = await dbSchema.findOne({ email });

      if (!ExistingUser) {
        const newUser = new dbSchema(userData);
        await newUser.save();
        return res
          .status(200)
          .send({ message: "User registered successfully" });
      }
      res.status(400).send({ message: "Email aready existes" });
    }
  } catch (error) {
    res.status(400).send("Failed to signup");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ExistingUser = await dbSchema.findOne({ email });
    if (ExistingUser) {
      const decryptedPass = await bcrypt.compare(
        password,
        ExistingUser.password
      );
      if (decryptedPass && email == ExistingUser.email) {
        res.status(200).send({
          message: "Login Succesfull",
          token: await ExistingUser.genJWTtoken(),
          user_id: ExistingUser._id.toString(),
        });
      } else {
        res.status(401).send({ message: "invalid Username or Password" });
      }
    } else {
      res.status(401).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Login failed" });
  }
};

module.exports = {
  Home,
  fetchUserData,
  signup,
  login,
  deleteUser,
  updateUserStats,
};
