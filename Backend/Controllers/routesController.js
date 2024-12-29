const axios = require("axios");
const Z = require("zod");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const {
  userSchema,
  LeetcodeUserDataSchema,
} = require("../Schema/leetCodeSchema");
const bcrypt = require("bcrypt");

const Home = (req, res) => {
  res.status(200).send("Welcome to Digital Wallet");
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const own_user = await userSchema.findByIdAndDelete(id);
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

      const ExistingUser = await userSchema.findOne({ email });

      if (!ExistingUser) {
        const newUser = new userSchema(userData);
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
    const ExistingUser = await userSchema.findOne({ email });
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

// const GetUserProfile = async (req, res) => {
//   const { username, id } = req.params;

//   try {
//     const userData = await axios.get(
//       `https://alfa-leetcode-api.onrender.com/userProfile/${username}`
//     );
//     if (userData) {
//       const data = {
//         userId: id,
//         userStats: userData.data,
//         FetchDate: new Date().toLocaleString("en-US", {
//           year: "numeric",
//           month: "2-digit",
//           day: "2-digit",
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//           hour12: true,
//           timeZone: "Asia/Kolkata",
//         }),
//       };
//       const saveData = new LeetcodeUserDataSchema(data);
//       await saveData.save();
//       res.status(200).send({
//         message: "User Data Fetched Succesfully",
//         response: userData.data,
//       });
//     }
//     res
//       .status(404)
//       .send({ message: `user with username: ${username} not found` });
//   } catch (error) {
//     res.status(400).send({
//       message: "Error fetching user profile",
//       error: error.message,
//     });
//   }
// };

const GetUserProfile = async (req, res) => {
  const { username, id } = req.params;

  try {
    const userData = await axios.get(
      ` http://localhost:3000/userProfile/${username}`
    );

    if (userData) {
      const data = {
        userId: id,
        userStats: userData.data,
        FetchDate: new Date().toLocaleString("en-US", {
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

      const saveData = new LeetcodeUserDataSchema(data);
      await saveData.save();

      // Send response and exit the function
      return res.status(200).send({
        message: "User Data Fetched Successfully",
        response: userData.data,
      });
    }

    // Send 404 response if userData doesn't exist
    return res
      .status(404)
      .send({ message: `User with username: ${username} not found` });

  } catch (error) {
    // Handle errors
    return res.status(400).send({
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};



const updateUserStats = async (req, res) => {
  try {
    const { username, id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(403).send("Invalid ID format");
    }

    if (!username && !id) {
      res.status(400).send({ message: "enter proper data" });
    } else {
      const userData = await axios.get(
        `https://alfa-leetcode-api.onrender.com/userProfile/${username}`
      );

      const existingUser = await LeetcodeUserDataSchema.findOne({ userId: id });

      if (userData && existingUser) {
        const data = {
          userId: id,
          userStats: userData.data,
          FetchDate: new Date().toLocaleString("en-US", {
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
        try {
          const updatedData = await LeetcodeUserDataSchema.findByIdAndUpdate(
            existingUser._id.toString(),
            data,
            { new: true, runValidators: true }
          );

          if (!updatedData) {
            res
              .status(403)
              .send({ message: "No user found with the provided ID" });
          }
          // Updated succesfully
          res.status(200).send({ message: "Update Succesfull" });
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      } else {
        res
          .status(400)
          .send({ message: "Invalid input data or user does not exist" });
      }
    }
  } catch (error) {
    res.status(400).send({ message: "failed to update data" });
  }
};

const getUserDataFromDB = async (req,res) => {
  const {id} = req.params;
  try {
    if(!id){
      res.status(400).send({ message: "invalid user id" });
    }
    const data = await LeetcodeUserDataSchema.findOne({userId: id})
    return res.status(200).send({data: data});
  } catch (error) {
    res.status(400).send({ message: "error in getting user data" , error:error.message });
  }
}


module.exports = {
  Home,
  signup,
  login,
  deleteUser,
  updateUserStats,
  GetUserProfile,
  getUserDataFromDB,
};
