const { default: mongoose } = require("mongoose");
const TaskCompletedModel = require("../task_completed/TaskComplete.Schema");
const TaskModel = require("./Task.Schema");
const UserModel = require("../user/User.Schema");

const CreateNewTask = async (req, res) => {
    try {
        const body = req.body;
        const TaskObj = {
            ...body,
            participateCount: 0,
            participateLimit: 100000000000000000000000000000000000,
            isPause: true,
            points: 0,
            isDelete: false,
            recuring: 'none'
        };
        const result = await TaskModel.create(TaskObj);
        return res.send({
            msg: 'New task inserted!',
            statusCode: 200,
            data: result
        })
    } catch (error) {
        return res.status(400).send({
            msg: error?.message,
            statusCode: 400,
            data: []
        })
    }
};

const TaskList = async (req, res) => {
    const userId = req.query.userId;

    try {
        const list = await TaskModel.find({ isPause: false }).sort({ updatedAt: -1 });
        const listCompleteUser = await TaskCompletedModel.find({ userId });
        const user = await UserModel.findOne({ userId });
        // const completedTaskIds = new Set(listCompleteUser.map(task => task.taskId.toString()));
        const completedTaskIds = new Set(listCompleteUser.map((task) => {
            const recurringTime = new Date(task?.recuring);
            const currentTime = new Date();

            const hasTimePassed = currentTime > recurringTime;
            if (hasTimePassed === true) {
                return;
            } else {
                return task.taskId.toString();
            }
        }));

        const result = list.map(task => ({
            ...task._doc,
            isComplete: completedTaskIds.has(task._id.toString())
        }));

        return res.status(200).send({
            msg: 'Task list retrieved successfully!',
            statusCode: 200,
            data: {result, user}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            msg: 'Failed to retrieve task list.',
            statusCode: 500,
            data: []
        });
    }
};

const UpdateTask = async (req, res) => {
    try {

        const updateData = await TaskModel.findByIdAndUpdate(req?.body?._id, {
            ...req?.body
        });

        return res.send({
            msg: 'Task was updated!',
            data: updateData,
            statusCode: 200
        });
    } catch (error) {
        return res.status(400).send({
            msg: error?.message,
            data: [],
            statusCode: 400
        });
    }
}
const AdminTaskList = async (req, res) => {
    const { title, type } = req?.query;
    let query = {};
    if (title) {
        query.title = { $regex: title, $options: 'i' };
    }
    if (type) {
        query.isPause = type === 'live' ? false : true;
    }
    try {
        const tasks = await TaskModel.find(query);
        return res.send({
            msg: 'Task retrieved',
            data: tasks,
            statusCode: 200
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error retrieving tasks',
            error: error.message,
            statusCode: 500
        });
    }
};


// const AdminTaskList = async (req, res) => {
//     const title = req?.query?.title;

//     if (title) {
//         return res.send({
//             msg: 'task retrive',
//             data: await TaskModel.find({
//                 title: { $regex: title, $options: 'i' }
//             }),
//             statusCode: 200
//         })
//     } else {
//         return res.send({
//             msg: 'task retrive',
//             data: await TaskModel.find({}),
//             statusCode: 200
//         })
//     }
// };

// const AdminTaskByStatusList = async (req, res) => {
//     const type = req?.query?.type;
//     if (type) {
//         return res.send({
//             msg: 'task retrive',
//             data: await TaskModel.find({
//                 isPause: type === 'live' ? false : true
//              }),
//             statusCode: 200
//         })
//     } else {
//         return res.send({
//             msg: 'task retrive',
//             data: await TaskModel.find({}),
//             statusCode: 200
//         })
//     }
// };

module.exports = {
    CreateNewTask,
    UpdateTask,
    TaskList,
    AdminTaskList
};