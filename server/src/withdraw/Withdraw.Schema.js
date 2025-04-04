const { Schema, default: mongoose, model } = require("mongoose");

const WithdrawSchema = new Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    }
}, {timestamps:true});

const WithdrawModel = model("withdraw", WithdrawSchema);

module.exports = WithdrawModel;