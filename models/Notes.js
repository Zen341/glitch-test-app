const mongoose = require("mongoose")

const NotesSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    title: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        default: ""
    },
    createAt: {
        type: Number,
        default: Date.now()
    },
    editAt: {
        type: Number,
        default: Date.now()
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: "Notes"
})

module.exports = mongoose.model("Notes", NotesSchema)