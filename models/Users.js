const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    userName: {
        type: String
    },
    hashPass: {
        type: String
    },
    type: { // for now: 0 - any (delete), 1 - keep
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: "Users"
})

module.exports = mongoose.model("Users", UsersSchema)