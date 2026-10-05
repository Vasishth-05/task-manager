const express = require("express");

const getTasks = async (req, res) => {
    try {

        const findAllTasks = await Tasks.find()

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

const getTasksWithId = async () => {
    try {

        const id = req.params.id;

        const findTasksById = await Tasks.findById();

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

const postTasks = async () => {
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
