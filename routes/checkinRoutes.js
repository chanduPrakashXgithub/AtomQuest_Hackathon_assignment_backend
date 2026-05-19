const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {
    createCheckin,
    getCheckins,
    managerComment,
} = require("../controllers/checkinController");

router.post(
    "/",
    auth,
    role("employee"),
    createCheckin
);

router.get(
    "/",
    auth,
    getCheckins
);

router.put(
    "/comment/:id",
    auth,
    role("manager"),
    managerComment
);

module.exports = router;