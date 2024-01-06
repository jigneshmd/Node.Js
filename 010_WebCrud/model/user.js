const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  Fname: {
    type: String,
  },
  Lname: {
    type: String,
  },
  address: {
    type: String,
  },
  Course: {
    type: String,
  },
  Emailid: {
    type: String,
  },
  Password: {
    type: String,
  },
  Image: {
    type: String,
  },
  Tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

userSchema.pre("save", async function () {
  try {
    if (this.isModified("Password")) 
    {
      this.Password = await bcrypt.hash(this.Password, 10);
    }
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.KEY);
    this.Tokens = this.Tokens.concat({ token: token });
    this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};  

module.exports = new mongoose.model("user", userSchema);
