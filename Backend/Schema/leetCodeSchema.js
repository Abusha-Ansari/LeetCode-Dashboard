require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  college: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

registerSchema.pre("save", async function (next) {
  try {
    const data = this;
    if (!data.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(this.password, salt);
    this.password = hash_pass;
  } catch (error) {
    next(error);
  }
});

registerSchema.methods.genJWTtoken = async function () {
  try {
    return jwt.sign(
      {
        username: this.username,
        userID: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
        college: this.college,
      },
      process.env.JWT_TOKEN_PASSWORD,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const dbSchema = new mongoose.model("leetcodeDashboard_users", registerSchema);

const leetcodeStats = new mongoose.Schema({
  userId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'dbSchema' }]
  },
  total_Solved: {
    type: Number,
    require: true,
  },
  total_Questions: {
    type: Number,
    require: true,
  },
  total_Questions_EASY: {
    type: Number,
    require: true,
  },
  total_Questions_MEDIUM: {
    type: Number,
    require: true,
  },
  total_Questions_HARD: {
    type: Number,
    require: true,
  },
  total_Solved_EASY: {
    type: Number,
    require: true,
  },
  total_Solved_MEDIUM: {
    type: Number,
    require: true,
  },
  total_Solved_HARD: {
    type: Number,
    require: true,
  },
  acceptance_rate: {
    type: Number,
    require: true,
  },
  Ranking: {
    type: Number,
    require: true,
  },
  submissions: {
    type: Object,
    require: true,
  },
  updatedTime: {
    type: String,
    require: true,
  },
});

const userStatsSchema = new mongoose.model("user_stats", leetcodeStats);

module.exports = { dbSchema, userStatsSchema };
