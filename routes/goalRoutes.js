const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {
    createGoal,
    getEmployeeGoals,
    submitGoals,
    getManagerTeamGoals,
    approveGoal,
    returnForRework,
    unlockGoal,
} = require("../controllers/goalController");

router.post(
    "/",
    auth,
    role("employee"),
    createGoal
);

router.get(
    "/my-goals",
    auth,
    role("employee"),
    getEmployeeGoals
);

router.put(
    "/submit",
    auth,
    role("employee"),
    submitGoals
);

router.get(
    "/manager",
    auth,
    role("manager"),
    getManagerTeamGoals
);

router.put(
    "/approve/:id",
    auth,
    role("manager"),
    approveGoal
);

router.put(
    "/rework/:id",
    auth,
    role("manager"),
    returnForRework
);

router.put(
    "/unlock/:id",
    auth,
    role("admin"),
    unlockGoal
);

module.exports = router;