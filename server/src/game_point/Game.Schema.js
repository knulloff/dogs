const { Schema, default: mongoose, model } = require("mongoose");

const GameSchema = new Schema({
    point_table: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Point'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const GameModel = model("game", GameSchema);

module.exports = {
    GameModel
}