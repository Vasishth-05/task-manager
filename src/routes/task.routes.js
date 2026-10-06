const express = require('express');
const { getTasks, getTasksById, postTasks, putTasks, deleteTasks } = require("../controller/task.controller.js")

const router = express.Router()

router.route("/").get(getTasks)
router.route("/:id").get(getTasksById)
router.route("/").post(postTasks)
router.route("/:id").put(putTasks)
router.route("/:id").delete(deleteTasks)


module.exports = router;