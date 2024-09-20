const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['todo', 'inProgress', 'done'], default: 'todo' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
