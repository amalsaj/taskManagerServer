const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");

// Get Tasks
const getTasks = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const user = await User.findOne({ _id: currentUser._id });
    if (!user) {
      return res.status(401).json("User not found");
    }

    const tasks = await Task.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(`Failed to get ToDos, ${error.message}`);
  }
};

// Create Task
const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const currentUser = req.user;
    console.log(currentUser);
    const user = await User.findOne({ _id: currentUser._id });
    if (!user) {
      return res.status(401).json("User not found");
    }
    const task = new Task({ title, description, status, userId: user._id });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit Task
const editTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { taskId } = req.query;
    const currentUser = req.user;
    const user = await User.findOne({ _id: currentUser._id });
    if (!user) {
      return res.status(401).json("User not found");
    }

    // Check if taskId is provided
    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    // Ensure at least one field is provided to update
    if (!title && !description && !status) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    // Find and update the task
    const updatedTask = await Task.findOneAndUpdate(
      { userId: user._id, _id: taskId },
      { title, description, status },
      { new: true }
    );

    // If task is found and updated, return success
    if (updatedTask) {
      return res
        .status(200)
        .json({ message: "Task updated successfully", task: updatedTask });
    } else {
      return res.status(404).json({ message: "Task item not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.query;

    const currentUser = req.user;
    const user = await User.findOne({ _id: currentUser._id });
    if (!user) {
      return res.status(401).json("User not found");
    }
    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    // Find and delete the task
    const deletedTask = await Task.findOneAndDelete({
      userId: user._id,
      _id: taskId,
    });

    if (deletedTask) {
      return res
        .status(200)
        .json({ message: "Task item deleted successfully" });
    } else {
      return res.status(404).json({ message: "Task item not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createTask, getTasks, editTask, deleteTask };
