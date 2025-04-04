const { Schema, default: mongoose, model } = require("mongoose");

const PointSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'user'
    },
    point: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const PointModel = model("Point", PointSchema);

module.exports = PointModel;