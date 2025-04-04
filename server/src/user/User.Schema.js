const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
    },
    fullName: {
        type: String,
        required: true,
    },
    isBlocked: {
        type: Boolean,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },
    profilePicture: String,
    lastGamePlayed: String,
    referredBy: Number,
    completedTask: Number,
    transaction: Boolean,
    friend: Boolean,
    friend10: Boolean,
    friend25: Boolean,
    friend50: Boolean,
    friend100: Boolean,
    wallet: Boolean,
    role: String,
}, { timestamps: true });

const UserModel = model("user", UserSchema);

module.exports = UserModel;