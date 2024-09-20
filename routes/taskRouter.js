const {
  getTasks,
  createTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../utils/auth");

const router = require("express").Router();
router.route("/createTask").post(authMiddleware, createTask);
router.route("/getTasks").get(authMiddleware, getTasks);
router.route("/editTask").put(authMiddleware, editTask);
router.route("/deleteTask").delete(authMiddleware, deleteTask);

module.exports = router;
