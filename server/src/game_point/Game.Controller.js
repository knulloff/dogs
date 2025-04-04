const { default: mongoose } = require("mongoose");
const { GameModel } = require("./Game.Schema");
const PointModel = require("../point/Point.Schema");

const NewTapInstance = async (req, res) => {
    try {
        await GameModel.create({ amount: 0.3, ...req?.body });
        res.send({
            msg: 'instance created',
            statusCode: 200,
            data: []
        })
    } catch (error) {
        res.send({
            msg: error?.message,
            statusCode: 400,
            data: []
        })
    }
};

const MarkAllAsClaim = async (req, res) => {
    const session = await mongoose.startSession();
    const _userId = req?.body?.id; // user-table _id
    try {
        session.startTransaction();
        //find all tap instace
        const TapTotal = await GameModel.find({ user_id: _userId, status: "unclaim" }, {}, { session });
        // calculate total point
        const Calculate = (TapTotal?.length * 0.3);

        //get user exiting point
        const CurrentPoint = await PointModel.findOne({ userId: _userId }, {}, { session });

        // plus exiting point + Tap point
        const NewPoint = Number(CurrentPoint?.point) + Number(Calculate);

        // add new calculation point
        const UpdatePoint = await PointModel.findOneAndUpdate({ userId: _userId }, { point: NewPoint }, { session });

        //update tap instace as claim
        const UpdateStatus = await GameModel.updateMany({ user_id: _userId, status: "unclaim" }, { $set: { status: "claim" } }, { session })
        await session.commitTransaction();
        await session.endSession();

        res.send({
            msg: 'All Claim',
            statusCode: 200,
            data: { UpdatePoint, UpdateStatus }
        })
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        res.send({
            msg: error?.message,
            statusCode: 400,
            data: []
        })
    }
};

const GetRedeemAblePoint = async (req, res) => {
    const session = await mongoose.startSession();
    const _userId = req?.query?.id;
    try {
        session.startTransaction();
        const TapTotal = await GameModel.find({ user_id: _userId, status: "unclaim" }, {}, { session });
        const Calculate = (TapTotal?.length * 0.3);
      

        await session.commitTransaction();
        await session.endSession();

        res.send({
            msg: 'Rewarded Point Data Retrive!',
            statusCode: 200,
            data: { Point: Calculate }
        })
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        res.send({
            msg: error?.message,
            statusCode: 400,
            data: []
        })
    }
};

module.exports = {
    NewTapInstance,
    MarkAllAsClaim,
    GetRedeemAblePoint
}