const { default: mongoose } = require("mongoose");
const UserModel = require("./User.Schema");
const PointModel = require("../point/Point.Schema");
const querystring = require("querystring");
const { isValid } = require('@telegram-apps/init-data-node');

const CreateUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const parsedData = querystring.parse(req?.body?.init);
        parsedData.user = JSON.parse(decodeURIComponent(parsedData.user));
        if (!isValid(req?.body?.init, process.env.BOT_TOKEN)) {
            const user = await UserModel.findOne({ userId: req?.body?.userId });
            if (user?._id) {
                await session.commitTransaction();
                await session.endSession();

                return res.status(200).send({
                    data: [user],
                    statusCode: 200,
                    msg: 'user is logged!'
                });
            } else {
                const UserOBJ = {
                    ...req.body,
                    completedTask: 0,
                    isBlocked: false,
                    isDeleted: false,
                    transaction: false,
                    friend: false,
                    wallet: false,
                }
                const referredBy = req?.body?.referredBy;

                if (referredBy) {
                    const referMan = await UserModel.findOne({ userId: referredBy });
                    const referManPoint = await PointModel.findOne({ userId: referMan?._id });

                    referManPoint.point = Number(referManPoint?.point) + 1000;
                    await referManPoint.save();
                }

                const result = await UserModel.create([UserOBJ]);

                const PointOBJ = {
                    userId: result[0]._id,
                    point: 2346
                };

                await PointModel.create([PointOBJ]);

                await session.commitTransaction();
                await session.endSession();

                return res.status(200).send({
                    data: result,
                    statusCode: 200,
                    msg: 'user is created!'
                });
            }
        } else {
            await session.abortTransaction();
            await session.endSession();

            return res.status(200).send({
                data: [],
                statusCode: 500,
                msg: "Something went wrong"
            });
        }
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        return res.status(200).send({
            data: [],
            statusCode: 500,
            msg: error.message
        });
    }
};


const UpdateUser = async (req, res) => {
    try {
        const body = req.body;
        const UpdateResult = await UserModel?.updateOne({ userId: body?.userId }, { ...body });
        res.send({
            msg: UpdateResult?.matchedCount === 1 && UpdateResult?.modifiedCount === 1 ? 'User Data Updated' : `Something went wrong, I can't update user informission.`,
            statusCode: 200,
            data: UpdateResult
        });
    } catch (error) {

    }
}

const FindUser = async (req, res) => {
    try {
        const Query = req.query.userId;
        const findUser = await UserModel.findOne({ userId: Query });
        res.send(findUser)
    } catch (error) {

    }
}

const UpdateGamePlayTime = async (req, res) => {
    const id = req?.body?.id;
    await UserModel?.findByIdAndUpdate(id, { lastGamePlayed: req?.body?.lastGamePlayed });
    res.send({
        msg: 'time added on server',
        statusCode: 200,
        data: []
    })
}

const TransactionTask = async (req, res) => {
    // userId, 
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        if (!req?.body?.userId) {
            return res.status(400).send({
                msg: 'Id not found',
                statusCode: 400,
                data: []
            })
        }
        
        const user = await UserModel.findById(req?.body?.userId);
        const point = await PointModel.findOne({ userId: user?._id }).session(session);
        if (point?._id) {
            point.point = point?.point + Number(process.env.TON_REWARDS);
            await point.save();
        }
        if (user.transaction) {
            throw new Error("Already claimed transection rewards!");
        }
        user.transaction = true;
        await user.save();

        await session.commitTransaction();
        await session.endSession();
        return res.send({
            msg: 'Transection completed!',
            statusCode: 200,
            data: []
        })
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        return res.status(400).send({
            msg: error?.message,
            statusCode: 200,
            data: []
        })
    }
}

const Invite8678Task = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        // Validate the input
        const { userId, refer_count } = req.body;
        if (!userId || typeof refer_count !== 'number') {
            return res.status(400).send({
                msg: 'Invalid input data',
                statusCode: 400,
                data: []
            });
        }

        // Reward map
        const rewardMap = {
            3: { reward: 5000, field: 'friend' },
            10: { reward: 15000, field: 'friend10' },
            25: { reward: 40000, field: 'friend25' },
            50: { reward: 85000, field: 'friend50' },
            100: { reward: 150000, field: 'friend100' }
        };

        const rewardData = rewardMap[refer_count];
        if (!rewardData) {
            return res.status(400).send({
                msg: 'Invalid referral count',
                statusCode: 400,
                data: []
            });
        }

        session.startTransaction();

        const user = await UserModel.findById(userId).session(session);
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the reward has already been claimed
        if (user[rewardData.field]) {
            throw new Error('Already claimed this referral reward!');
        }

        const point = await PointModel.findOne({ userId: user._id }).session(session);
        const referCount = await UserModel.countDocuments({ referredBy: user.userId }).session(session);

        if (referCount >= refer_count) {
            // Update points if they exist
            if (point?._id) {
                point.point += rewardData.reward;
                await point.save();
            } else {
                throw new Error('Points record not found');
            }

            // Set the appropriate referral flag to true
            user[rewardData.field] = true;
            await user.save();

            await session.commitTransaction();
            return res.status(200).send({
                msg: 'Invite completed!',
                statusCode: 200,
                data: []
            });
        } else {
            throw new Error(`Not completed ${refer_count} invites`);
        }
    } catch (error) {
        await session.abortTransaction();
        return res.status(500).send({
            msg: error.message,
            statusCode: 500,
            data: []
        });
    } finally {
        session.endSession();
    }
};

const InviteTask = async (req, res) => {
    // userId, 
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const refer_count = Number(req?.body?.refer_count);
        let rewards = 0;
        switch (refer_count) {
            case 3:
                rewards = 5000;
                break;
            case 10:
                rewards = 15000;
                break;
            case 25:
                rewards = 40000;
                break;
            case 50:
                rewards = 85000;
                break;
            case 100:
                rewards = 150000;
                break;
            case 1000:
                rewards = 150000;
                break;
            default:
                rewards = 0;
                break;
        }

        if (refer_count) {
            const user = await UserModel.findById(req?.body?.userId).session(session);
            const point = await PointModel.findOne({ userId: user?._id }).session(session);
            const referCount = await UserModel.find({ referredBy: user?.userId }).session(session);
            if (referCount.length >= refer_count) {
                if (point?._id) {
                    point.point = point?.point + rewards;
                    await point.save();
                }

                switch (refer_count) {
                    case 3:
                        if (user?.friend === true) {
                            throw new Error("Already Claim Refer Rewards!");
                        }
                        user.friend = true;
                        await user.save();
                        break;
                    case 10:
                        if (user?.friend10 === true) {
                            throw new Error("Already Claim Refer Rewards!");
                        }
                        user.friend10 = true;
                        await user.save();
                        break;
                    case 25:
                        if (user?.friend25 === true) {
                            throw new Error("Already Claim Refer Rewards!");
                        }
                        user.friend25 = true;
                        await user.save();
                        break;
                    case 50:
                        if (user?.friend50 === true) {
                            throw new Error("Already Claim Refer Rewards!");
                        }
                        user.friend50 = true;
                        await user.save();
                        break;
                    case 100:
                        if (user?.friend100 === true) {
                            throw new Error("Already Claim Refer Rewards!");
                        }
                        user.friend100 = true;
                        await user.save();
                        break;
                    default:
                        rewards = 0;
                        break;
                }

                await session.commitTransaction();
                await session.endSession();
                return res.send({
                    msg: 'Invite completed!',
                    statusCode: 200,
                    data: []
                })
            } else {
                await session.abortTransaction();
                await session.endSession();

                res.status(200).send({
                    data: [],
                    statusCode: 500,
                    msg: `Not completed ${refer_count} invite`
                });
            }
        } else {
            throw new Error("I am not sure what i do!");
        }
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        res.status(200).send({
            data: [],
            statusCode: 500,
            msg: error.message
        });
    }
}

const ReferredBy = async ({ userId, referredBy, session }) => {
    try {

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        return
    }
}

const ReferLeaderboardList = async (req, res) => {
    const referId = req?.query?.id;
    const result = await UserModel.find({ referredBy: referId }).sort('-createdAt');

    return res.send({
        msg: 'refer list retrive.',
        data: result,
        statusCode: 200
    })
}

const Statistic = async (req, res) => {
    const verifiy_user = await UserModel.countDocuments({ transaction: true });
    const total_user = await UserModel.countDocuments({});

    return res.send({
        msg: 'refer list retrive.',
        data: {
            verifiy_user,
            total_user
        },
        statusCode: 200
    })
}

module.exports = {
    CreateUser,
    FindUser,
    UpdateUser,
    ReferredBy,
    UpdateGamePlayTime,
    ReferLeaderboardList,
    TransactionTask,
    InviteTask,
    Statistic
}