const Goal = require("../models/Goal");
const AuditLog = require("../models/AuditLog");

exports.createGoal = async (req, res) => {
    try {
        const employeeId = req.user.id;

        const existingGoals = await Goal.find({
            employeeId,
        });

        if (existingGoals.length >= 8) {
            return res.status(400).json({
                message: "Maximum 8 goals allowed",
            });
        }

        const totalWeightage =
            existingGoals.reduce(
                (acc, goal) => acc + goal.weightage,
                0
            ) + req.body.weightage;

        if (req.body.weightage < 10) {
            return res.status(400).json({
                message: "Minimum weightage is 10%",
            });
        }

        if (totalWeightage > 100) {
            return res.status(400).json({
                message: "Total weightage exceeds 100%",
            });
        }

        const goal = await Goal.create({
            ...req.body,
            employeeId,
        });

        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getEmployeeGoals = async (req, res) => {
    try {
        const goals = await Goal.find({
            employeeId: req.user.id,
        });

        res.json(goals);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.submitGoals = async (req, res) => {
    try {
        const goals = await Goal.find({
            employeeId: req.user.id,
        });

        const totalWeightage = goals.reduce(
            (acc, goal) => acc + goal.weightage,
            0
        );

        if (totalWeightage !== 100) {
            return res.status(400).json({
                message:
                    "Total goal weightage must equal 100%",
            });
        }

        await Goal.updateMany(
            {
                employeeId: req.user.id,
            },
            {
                status: "submitted",
            }
        );

        res.json({
            message: "Goals submitted successfully",
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getManagerTeamGoals = async (req, res) => {
    try {
        const goals = await Goal.find({
            status: "submitted",
        }).populate("employeeId");

        res.json(goals);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.approveGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        const before = { ...goal._doc };

        goal.target = req.body.target || goal.target;

        goal.weightage =
            req.body.weightage || goal.weightage;

        goal.status = "approved";

        goal.locked = true;

        await goal.save();

        await AuditLog.create({
            user: req.user.id,
            action: "GOAL_APPROVED",
            before,
            after: goal,
        });

        res.json(goal);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.returnForRework = async (req, res) => {
    try {
        const goal = await Goal.findByIdAndUpdate(
            req.params.id,
            {
                status: "rework",
                locked: false,
            },
            { new: true }
        );

        res.json(goal);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.unlockGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        const before = { ...goal._doc };

        goal.locked = false;

        await goal.save();

        await AuditLog.create({
            user: req.user.id,
            action: "GOAL_UNLOCKED",
            before,
            after: goal,
        });

        res.json({
            message: "Goal unlocked",
        });
    } catch (error) {
        res.status(500).json(error);
    }
};