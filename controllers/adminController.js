const Goal = require("../models/Goal");

const Checkin = require("../models/Checkin");

const AuditLog = require("../models/AuditLog");

const ExcelJS = require("exceljs");

exports.getDashboard = async (req, res) => {
    try {
        const totalGoals =
            await Goal.countDocuments();

        const completedCheckins =
            await Checkin.countDocuments({
                status: "Completed",
            });

        const pendingGoals =
            await Goal.countDocuments({
                status: "submitted",
            });

        res.json({
            totalGoals,
            completedCheckins,
            pendingGoals,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find();

        res.json(logs);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.exportReport = async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();

        const sheet =
            workbook.addWorksheet("Achievements");

        sheet.columns = [
            {
                header: "Employee",
                key: "employee",
                width: 20,
            },
            {
                header: "Goal",
                key: "goal",
                width: 30,
            },
            {
                header: "Quarter",
                key: "quarter",
                width: 10,
            },
            {
                header: "Achievement",
                key: "achievement",
                width: 20,
            },
            {
                header: "Progress %",
                key: "progress",
                width: 15,
            },
        ];

        const checkins = await Checkin.find()
            .populate({
                path: "goalId",
                populate: {
                    path: "employeeId",
                },
            });

        checkins.forEach((item) => {
            sheet.addRow({
                employee:
                    item.goalId.employeeId.name,
                goal: item.goalId.title,
                quarter: item.quarter,
                achievement: item.achievement,
                progress: item.progressScore,
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=report.xlsx"
        );

        await workbook.xlsx.write(res);

        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
};