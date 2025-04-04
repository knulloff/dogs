const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    participateLimit: {
        type: Number,
        required: true
    },
    participateCount: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    recuring: {
        type: String,
        required: true
    },
    isPause: {
        type: Boolean,
        required: true
    },
    isDelete: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const TaskModel = model("task", TaskSchema);

module.exports = TaskModel;