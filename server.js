const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(
    cors({
        origin:
            "https://atom-quest-hackathon-assignment-fro.vercel.app",
        credentials: true,
    })
);

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use(
    "/api/checkins",
    require("./routes/checkinRoutes")
);
app.use(
    "/api/admin",
    require("./routes/adminRoutes")
);

app.get("/", (req, res) => {
    res.send("Goal Tracker API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});