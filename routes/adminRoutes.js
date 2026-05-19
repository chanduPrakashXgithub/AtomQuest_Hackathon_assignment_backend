const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {
    getDashboard,
    getAuditLogs,
    exportReport,
} = require("../controllers/adminController");

router.get(
    "/dashboard",
    auth,
    role("admin"),
    getDashboard
);

router.get(
    "/audit-logs",
    auth,
    role("admin"),
    getAuditLogs
);

router.get(
    "/export",
    auth,
    role("admin"),
    exportReport
);

module.exports = router;