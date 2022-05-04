const mongoose  = require("mongoose")

const GoalSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const GoalModel = mongoose.model("goals", GoalSchema)
module.exports = GoalModel