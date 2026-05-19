
const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
    {
        user: String,

        action: String,

        before: Object,

        after: Object,
    },
    { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);