const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        seedUsers();
    })
    .catch((err) => {
        console.log(err);
    });

const seedUsers = async () => {
    try {
        // Delete old users
        await User.deleteMany();

        // Hash password
        const hashedPassword =
            await bcrypt.hash("123456", 10);

        // Create users
        const users = [
            {
                name: "Employee",
                email: "employee@demo.com",
                password: hashedPassword,
                role: "employee",
            },

            {
                name: "Manager",
                email: "manager@demo.com",
                password: hashedPassword,
                role: "manager",
            },

            {
                name: "Admin",
                email: "admin@demo.com",
                password: hashedPassword,
                role: "admin",
            },
        ];

        await User.insertMany(users);

        console.log(
            "Demo users inserted successfully"
        );

        console.log(`
Employee:
employee@demo.com
123456

Manager:
manager@demo.com
123456

Admin:
admin@demo.com
123456
`);

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};