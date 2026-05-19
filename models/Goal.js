const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        thrustArea: String,

        title: String,

        description: String,

        uomType: {
            type: String,
            enum: ["min", "max", "timeline", "zero"],
        },

        target: Number,

        weightage: Number,

        status: {
            type: String,
            enum: ["draft", "submitted", "approved", "rework"],
            default: "draft",
        },

        locked: {
            type: Boolean,
            default: false,
        },

        sharedGoalId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);