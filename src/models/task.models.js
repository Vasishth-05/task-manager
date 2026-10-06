const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    }
})

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;