const UserModel = require("../user/User.Schema");
const PointModel = require("./Point.Schema")

const LeaderboardByPoints = async (req, res) => {
    const userId = req?.query?.id;
    let User;
    let userRank;
    const user = await UserModel.findOne({ userId });
    if (userId) {
        User = await PointModel
            .findOne({ userId: user?._id })
            .populate('userId')
            .select('-userId.isBlocked -userId.isDeleted -userId.createdAt -updatedAt');
        userRank = await PointModel.countDocuments({ point: { $gt: User?.point ? User?.point : 0 } }) + 1;
    }

    const Leader = await PointModel
        .find({})
        .sort({ point: -1 })
        .limit(100)
        .populate('userId')
        .select('-userId.isBlocked -userId.isDeleted -userId.createdAt -updatedAt');

    const me = {
        userRank,
        User
    };

    res.send({
        msg: 'New Leaderboard list!',
        statusCode: 200,
        data: [
            me,
            ...Leader
        ]
    })
};

const LeaderboardByPointsAdmin = async (req, res) => {

    const Leader = await PointModel
        .find({})
        .sort({ point: -1 })
        .populate('userId')
        .select('-userId.isBlocked -userId.isDeleted -userId.createdAt -updatedAt');


    res.send({
        msg: 'New Leaderboard list!',
        statusCode: 200,
        data: Leader
    })
};

const PointTableByUserId = async (req, res) => {
    if (req?.query?.id) {
        const result = await PointModel.findOne({ userId: req?.query?.id }).populate("userId");
        
        return res.send(result);
    }else{
        return res.send("No ID!")
    }
}

const UpdatePoint = async (req, res) => {
    const result = await PointModel.findOneAndUpdate({ _id: req?.body?.id }, { ...req?.body });
    res.send(result)
}

module.exports = {
    LeaderboardByPoints,
    PointTableByUserId,
    LeaderboardByPointsAdmin,
    UpdatePoint
}