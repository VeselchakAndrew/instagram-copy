const mongoose = require("mongoose")
const {Schema, ObjectId} = require("mongoose");

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "No photo"
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }

})

module.exports = mongoose.model("Post", postSchema);