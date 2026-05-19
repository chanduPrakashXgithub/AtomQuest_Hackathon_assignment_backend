const mongoose = require("mongoose");

const checkinSchema = new mongoose.Schema(
    {
        goalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Goal",
        },

        quarter: {
            type: String,
            enum: ["Q1", "Q2", "Q3", "Q4"],
        },

        achievement: Number,

        progressScore: Number,

        status: {
            type: String,
            enum: ["Not Started", "On Track", "Completed"],
        },

        managerComment: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Checkin", checkinSchema);