const { Schema, model, default: mongoose } = require("mongoose");
const UserModel = require("../user/User.Schema");
const TaskModel = require("../task/Task.Schema");

const TaskCompletedSchema = new Schema({
    userId: {
        type: Number,
        required: true,
    },
    taskId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "task"
    },
    recuring: {
        type: String,
        required: true
    }
}, { timestamps: true });

const TaskCompletedModel = model("completedTask", TaskCompletedSchema);

module.exports = TaskCompletedModel;