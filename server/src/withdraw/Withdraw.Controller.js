const { default: mongoose } = require("mongoose");
const UserModel = require("../user/User.Schema");
const PointModel = require("../point/Point.Schema");
const WithdrawModel = require("./Withdraw.Schema");

const MakeWithdraw = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const findUser = await UserModel.findById(req.body._userId, {}, { session });
        if (findUser) {
            const findPointTable = await PointModel.findOne({ userId: req?.body?._userId }, {}, { session });
            if (findPointTable) {
                if (findPointTable?.point >= req?.body?.amount) {
                    const withdrawObject = {
                        status: "pending",
                        ...req?.body
                    }
                    const withdrawResult = await WithdrawModel.create([withdrawObject], { session });
                    await PointModel.findOneAndUpdate({ userId: req?.body?._userId }, { point: (Number(findPointTable?.point - req?.body?.amount)) }, { session })
                    await session.commitTransaction();
                    await session.endSession();
                    return res.send({
                        msg: 'Withdraw requested',
                        statusCode: 200,
                        data: withdrawResult
                    })
                } else {
                    throw new Error("You not have enough points");
                }
            } else {
                throw new Error("Point table is not found!");
            }
        } else {
            throw new Error("User is not found!");
        }

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        return res.send({
            msg: error?.message,
            statusCode: 400,
            data: []
        })
    }
};

const CancelWithdraw = async (req, res) => {
    const session = await mongoose.startSession();
    const _id = req?.body?.id;
    try {
        session.startTransaction();
        const findWithdraw = await WithdrawModel.findById(_id, {}, { session });
        const findPoint = await PointModel.findOne({ userId: findWithdraw?._userId });
        await PointModel.findOneAndUpdate({ userId: findWithdraw?._userId }, { point: (Number(findPoint?.point) || 0 + findWithdraw?.amount) }, { session });
        await WithdrawModel.findByIdAndUpdate(_id, { status: 'canceled' }, { session })
        await session.commitTransaction();
        await session.endSession();
        return res.send({
            msg: 'Withdraw request canceled!',
            data: [],
            statusCode: 200
        })
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        return res.send({
            msg: error?.message,
            data: [],
            statusCode: 400
        })
    }
}

const MarkAsPaid = async (req, res) => {
    const _id = req?.body?.id;
    try {
        await WithdrawModel.findByIdAndUpdate(_id, { status: 'paid' });
        return res.send({
            msg: 'Withdraw request accepted!',
            data: [],
            statusCode: 200
        })
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        return res.status(400).send({
            msg: error?.message,
            data: [],
            statusCode: 400
        })
    }
}

const GetAllList = async (req, res) => {
    const status = req.query.status;
    if (status === 'all') {
        const result = await WithdrawModel.find({}).populate('_userId', 'username fullName');
        const resultWithPoints = await Promise.all(result.map(async (item) => {
            const pointData = await PointModel.findOne({ userId: item?._userId?._id });
            return {
                ...item.toObject(),
                point: pointData?.point || 0
            };
        }));

        return res.send({
            msg: 'All withdraw list.',
            data: resultWithPoints,
            statusCode: 200
        });

    } else {
        const result = await WithdrawModel.find({ status }).populate('_userId', 'username fullName');
        const resultWithPoints = await Promise.all(result.map(async (item) => {
            const pointData = await PointModel.findOne({ userId: item?._userId?._id });
            return {
                ...item.toObject(),
                point: pointData?.point || 0
            };
        }));

        return res.send({
            msg: status + ' withdraw list.',
            data: resultWithPoints,
            statusCode: 200
        });
    }
}

const Recheck = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const findWithdraw = await WithdrawModel.findById(req?.query?.id, {}, { session });

        //find user balance 
        const findUserPoint = await PointModel.findOne({ userId: findWithdraw?._userId }, {}, { session });
        //cut user balance

        if (findUserPoint?.point >= findWithdraw?.amount) {
            const decreaseBalance = await PointModel.findOneAndUpdate({ userId: findWithdraw?._userId }, {
                point: (Number(findUserPoint?.point) - Number(findWithdraw?.amount)),
            }, { session });

            // recome withdraw
            const reCheck = await WithdrawModel.findOneAndUpdate({ _userId: findWithdraw?._userId }, {
                status: 'pending'
            }, { session });

            await session.commitTransaction();
            await session.endSession();
            return res.send({
                msg: 'recheck request accpected!',
                statusCode: 200,
                data: {
                    decreaseBalance,
                    reCheck
                }
            })
        } else {
            throw new Error("User not have enough point!")
        }

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        return res.status(400).send({
            msg: error?.message,
            statusCode: 400,
            data: []
        })
    }
}

const GetLastWithdraw = async (req, res) => {
    const userId = req.query.userId;
    const findWithdraw = await WithdrawModel
        .find({ _userId: userId })
        .sort('-updatedAt')
        .limit(1);
    res.send(findWithdraw[0]);
}

module.exports = {
    MakeWithdraw,
    GetAllList,
    CancelWithdraw,
    MarkAsPaid,
    Recheck,
    GetLastWithdraw
}