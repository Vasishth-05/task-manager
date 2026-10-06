const express = require("express");
const Tasks = require("../models/task.models.js")

const getTasks = async (req, res) => {
    try {

        const { completed, priority, sort } = req.query;

        const filter = {};

        if (completed) {
            filter.completed = completed === "true";
        }

        if (priority) {
            filter.priority = priority;
        }

        let sortOption = {}

        if (sort === "newest") {
            sortOption = { createdAt: -1 };
        }

        if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        }

        const findAllTasks = await Tasks.find(filter).sort(sortOption)

        res.status(201).json({
            message: "got all the tasks!",
            findAllTasks
        })

    } catch (error) {

        res.status(400).json({
            message: error.message
        })

    }

}

const getTasksById = async (req, res) => {
    try {

        const id = req.params.id;

        const findTasksById = await Tasks.findById(id);


        if (!findTasksById) {
            return res.status(404).json({
                message: "Task not Found"
            })
        }

        res.status(200).json({
            message: "Task Found",
            findTasksById
        })

    } catch (error) {

        res.status(400).json({
            message: error.message
        })

    }
}

const postTasks = async (req, res) => {
    try {

        const tasks = new Tasks(req.body);
        await tasks.save();

        res.status(201).json({
            message: "Task Created Successfully",
            tasks
        })


    } catch (error) {

        res.status(400).json({
            message: error.message
        })

    }
}


const putTasks = async (req, res) => {

    try {

        const id = req.params.id;

        const updateTasksById = await Tasks.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updateTasksById) {
            return res.status(404).json({
                message: "Task Does'nt exist"
            })
        }

        res.status(200).json({
            message: "Task is updated successfully",
            updateTasksById
        });


    } catch (error) {

        res.status(400).json({
            message: error.message
        })

    }

}

const deleteTasks = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteTasksById = await Tasks.findByIdAndDelete(id);

        if (!deleteTasksById) {
            return res.status(404).json({
                message: "Task doesn't Exist"
            })
        }

        res.status(200).json({
            message: "Task deleted Successfully.",
            deleteTasksById
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

module.exports = {
    getTasks,
    getTasksById,
    postTasks,
    putTasks,
    deleteTasks
}