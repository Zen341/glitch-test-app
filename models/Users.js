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
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: "Users"
})

module.exports = mongoose.model("Users", UsersSchema)