const { default: mongoose } = require("mongoose");
const UserModel = require("../user/User.Schema");
const TaskCompletedModel = require("./TaskComplete.Schema");
const TaskModel = require("../task/Task.Schema");
const PointModel = require("../point/Point.Schema");

const CompleteTask = async (req, res) => {
    const body = req.body;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const findUser = await UserModel.findOne({ userId: body?.userId });
        const findTask = await TaskModel.findById({ _id: body?.taskId });



        if (findUser && findTask) {
            const findUnique = await TaskCompletedModel.findOne({ userId: body?.userId, taskId: body?.taskId });
            if (findUnique) {
                const recurringTime = new Date(findUnique?.recuring);
                const currentTime = new Date();

                const hasTimePassed = currentTime > recurringTime;
                if (hasTimePassed === true) {
                    let currentDate = new Date();

                    switch (findTask?.recuring) {
                        case 'daily':
                            currentDate.setDate(currentDate.getDate() + 1);
                            break;
                        case 'weekly':
                            currentDate.setDate(currentDate.getDate() + 7);
                            break;
                        case 'monthly':
                            currentDate.setDate(currentDate.getDate() + 30);
                            break;
                        default:
                            currentDate.setDate(currentDate.getDate() + 1000);
                    }

                    const SaveObject = {
                        ...body,
                        recuring: currentDate
                    }

                    const readUser = await UserModel.findOne({ userId: body?.userId });
                    const writeUser = await UserModel.findOneAndUpdate({ userId: body?.userId },
                        {
                            completedTask: readUser?.completedTask || 0 + 1,
                        },
                        { session });

                    const findPoint = await PointModel.findOne({ userId: readUser?._id }, {}, { session });

                    const addPoint = await PointModel.findOneAndUpdate({ userId: readUser?._id }, { point: findPoint?.point + findTask?.points }, { session });

                    // TODO: Control that from server setting.
                    console.log(findUser);

                    if (findUser?.referredBy) {
                        const findReferer = await UserModel.findOne({ userId: findUser?.referredBy });
                        const points = (Number(findReferer?.point || 0) + ((Number(findTask?.points) * 10) / 100));
                        console.log(points || 0);
                        console.log(findReferer);

                        // await PointModel.findOneAndUpdate({ userId: findReferer?._id }, { point: points }, { session });
                    }

                    const writeCompletedTask = await TaskCompletedModel.create([SaveObject], { session });

                    await session.commitTransaction();
                    await session.endSession();
                    return res.send({
                        msg: 'Task Completed!',
                        statusCode: 200,
                        data: { user: writeUser, task: writeCompletedTask, point: addPoint }
                    })
                } else {
                    throw new Error("The task is already completed by the user!");
                }
            } else {

                let currentDate = new Date();

                switch (findTask?.recuring) {
                    case 'daily':
                        currentDate.setDate(currentDate.getDate() + 1);
                        break;
                    case 'weekly':
                        currentDate.setDate(currentDate.getDate() + 7);
                        break;
                    case 'monthly':
                        currentDate.setDate(currentDate.getDate() + 30);
                        break;
                    default:
                        currentDate.setDate(currentDate.getDate() + 1000);
                }

                const SaveObject = {
                    ...body,
                    recuring: currentDate
                }

                const readUser = await UserModel.findOne({ userId: body?.userId });
                const writeUser = await UserModel.findOneAndUpdate({ userId: body?.userId },
                    {
                        completedTask: readUser?.completedTask || 0 + 1,
                    },
                    { session });

                const findPoint = await PointModel.findOne({ userId: readUser?._id }, {}, { session });

                const addPoint = await PointModel.findOneAndUpdate({ userId: readUser?._id }, { point: findPoint?.point + findTask?.points }, { session });

                // TODO: Control that from server setting.
                if (findUser?.referredBy) {
                    const findReferer = await UserModel.findOne({ userId: findUser?.referredBy });
                    const findPoint = await PointModel.findOne({ userId: findReferer?._id }, {}, { session });
                    const points = (Number(findPoint?.point) + ((Number(findTask?.points) * 10) / 100));
                    await PointModel.findOneAndUpdate({ userId: findReferer?._id }, { point: points }, { session });
                }

                const writeCompletedTask = await TaskCompletedModel.create([SaveObject], { session });

                await session.commitTransaction();
                await session.endSession();
                return res.send({
                    msg: 'Task Completed!',
                    statusCode: 200,
                    data: { user: writeUser, task: writeCompletedTask, point: addPoint }
                })
            }
        } else {
            throw new Error("Something went wrong!");
        }
    } catch (error) {
        console.log(error.stack);

        await session.abortTransaction();
        await session.endSession();
        return res.send({
            msg: error?.message,
            statusCode: 400,
            data: []
        })
    }
};

module.exports = {
    CompleteTask
}