const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: String,
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
