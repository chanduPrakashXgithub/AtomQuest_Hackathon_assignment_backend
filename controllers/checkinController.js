const Checkin = require("../models/Checkin");

const Goal = require("../models/Goal");

const calculateProgress = require(
    "../utils/calculateProgress"
);

exports.createCheckin = async (req, res) => {
    try {
        const {
            goalId,
            quarter,
            achievement,
            status,
        } = req.body;

        const goal = await Goal.findById(goalId);

        const progressScore = calculateProgress(
            goal.uomType,
            goal.target,
            achievement
        );

        const checkin = await Checkin.create({
            goalId,
            quarter,
            achievement,
            status,
            progressScore,
        });

        res.status(201).json(checkin);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getCheckins = async (req, res) => {
    try {
        const checkins = await Checkin.find().populate({
            path: "goalId",
            populate: {
                path: "employeeId",
            },
        });

        res.json(checkins);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.managerComment = async (req, res) => {
    try {
        const checkin =
            await Checkin.findByIdAndUpdate(
                req.params.id,
                {
                    managerComment:
                        req.body.managerComment,
                },
                { new: true }
            );

        res.json(checkin);
    } catch (error) {
        res.status(500).json(error);
    }
};