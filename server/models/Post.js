const mongoose = require('mongoose')
const {Schema} = require("mongoose");
const schema = mongoose.Schema

const PostSchema = new schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    status: {
        type: String,
        enum: ["TO LEARN", "LEARNING", "LEARNED"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})
module.exports = mongoose.model('Posts', PostSchema)