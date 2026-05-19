# AtomQuest Hackathon Assignment Backend

This repository contains the backend service for the AtomQuest Hackathon assignment, developed with Node.js and Express. It provides secure APIs for authentication, goal management, employee/manager/admin workflows, check-ins, and reporting for the AtomQuest platform.

---

## 🏗️ Architecture

The backend architecture uses the following main components:

- **Express.js**: Web framework for HTTP API endpoints
- **MongoDB (via Mongoose)**: Database for storing users, goals, check-ins, logs, etc.
- **JWT**: For secure user authentication
- **Role-Based Access Control**: Middleware restricts access to (employee, manager, admin)
- **Routes**: Organized by feature (`/auth`, `/goals`, `/checkins`, `/admin`)
- **Controllers**: Contain business logic for each route
- **Middleware**: Handles authentication, roles, CORS, error handling
- **morgan/cors/dotenv**: For logging, cross-origin requests, environment configs

```
+-----------------------------+
|    Client App (Frontend)    |
+-------------+---------------+
              |
       (HTTP REST API)
              |
+-------------v---------------+
|      Node.js / Express      |
|  [Routes / Controllers]     |
+-------------+---------------+
              |
           (Mongoose)
              |
+-------------v---------------+
|          MongoDB            |
+-----------------------------+
```

---

## ✨ Features

- User authentication (register/login via JWT)
- Employees can create, view, and submit performance goals
- Managers can view, approve, or return goals for rework (of their reports)
- Admins can unlock goals, access audit logs, export reports, and view dashboard
- Employees can submit periodic check-ins; managers can comment on check-ins
- Role-based access control (employee/manager/admin)
- API endpoint structure for scalable business logic
- Centralized error handling, logging, and environment config

---

## 📲 Actual Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | /register         | Register a new account   |
| POST   | /login            | Login and get JWT token  |

### Goals (`/api/goals`)
| Method | Endpoint                | Role      | Description                        |
|--------|-------------------------|-----------|------------------------------------|
| POST   | /                       | employee  | Create a new goal                  |
| GET    | /my-goals               | employee  | Get goals for logged-in employee   |
| PUT    | /submit                 | employee  | Submit goals for review            |
| GET    | /manager                | manager   | Manager: Get team goals            |
| PUT    | /approve/:id            | manager   | Manager: Approve a team member goal|
| PUT    | /rework/:id             | manager   | Manager: Return goal for rework    |
| PUT    | /unlock/:id             | admin     | Admin: Unlock a goal (for editing) |

### Check-ins (`/api/checkins`)
| Method | Endpoint          | Role      | Description                     |
|--------|-------------------|-----------|---------------------------------|
| POST   | /                 | employee  | Submit a new check-in           |
| GET    | /                 | any       | Get list of check-ins           |
| PUT    | /comment/:id      | manager   | Manager: Comment on a check-in  |

### Admin Panel (`/api/admin`)
| Method | Endpoint          | Role      | Description                     |
|--------|-------------------|-----------|---------------------------------|
| GET    | /dashboard        | admin     | Admin dashboard data            |
| GET    | /audit-logs       | admin     | Fetch audit logs                |
| GET    | /export           | admin     | Export report as XLSX           |

### Root Endpoint
| Method | Endpoint         | Description                       |
|--------|------------------|-----------------------------------|
| GET    | /                | Health check: API running message |

---

## 🚀 Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/chanduPrakashXgithub/AtomQuest_Hackathon_assignment_backend.git
    cd AtomQuest_Hackathon_assignment_backend
    ```

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory. Example:
    ```
    PORT=5000
    DB_URL=mongodb://localhost:27017/atomquest
    JWT_SECRET=your_jwt_secret_value
    ```

4. **Run the application**
    ```bash
    npm start
    ```
    Or, for development with auto-reload:
    ```bash
    npm run dev
    ```

---

## 🧑‍💻 Credentials to Login

> ⚠️ These are sample demo credentials. Replace with secure credentials for production!

**Admin Login**
- Username: `admin`
- Password: `admin123`

**Manager Login**
- Username: `manager`
- Password: `manager123`

**Employee Login**
- Username: `employee`
- Password: `employee123`

(*Or register as new user via `/api/auth/register`*)

---

## 🧾 Example API Usage

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Create Goal (Employee)

```http
POST /api/goals/
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Improve product quality",
  "description": "Increase automated test coverage to 90%",
  ...
}
```

---

## ⚙️ Environment Variables

| Variable      | Description                               | Example                               |
| ------------- | ----------------------------------------- | ------------------------------------- |
| PORT          | Port the app runs on                      | 5000                                  |
| DB_URL        | MongoDB connection string                 | mongodb://localhost:27017/atomquest   |
| JWT_SECRET    | Secret for signing JWT tokens             | your_jwt_secret_value                 |

---

## 📝 License

meeeee

---

## 👥 Contributors

- [chanduPrakashXgithub](https://github.com/chanduPrakashXgithub)

---

> Update any credentials, routes, or details to match your real deployment where needed.
