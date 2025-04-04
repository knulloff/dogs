const { model, default: mongoose, Schema } = require("mongoose");

const SettingSchema = new Schema({
    SecretCode: Number,
    ReferCommission: Number
})
const SettingModel = model("setting", SettingSchema);

const MatchSecretCode = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const SecretCode = req.body.secret;

        const Matching = await SettingModel.findOne({ SecretCode }, {}, { session });

        if (!Matching) {
            const GetData = await SettingModel.find({}, {}, { session });

            if (GetData?.length === 0) {
                const CreateSecret = await SettingModel.create({SecretCode}, { session });

                await session.commitTransaction();
                await session.endSession();
                return res.status(200).send({
                    msg: 'New Secret is created!',
                    data: {
                        ping: true
                    },
                    statusCode: 200
                })
            } else {
                throw new Error("Secret Code is not matching...");
            }
        } else {
            await session.commitTransaction();
            await session.endSession();
            return res.status(200).send({
                msg: 'Secret is matched!',
                data: {
                    ping: true
                },
                statusCode: 200
            })
        }
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        return res.status(400).send({
            msg: error?.message,
            data: {
                ping: false
            },
            statusCode: 400
        })
    }
};

module.exports = {
    MatchSecretCode
}