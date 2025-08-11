
# LeapNote

Welcome to LeapNotes, a clean, responsive, and secure full-stack note-taking application built with React, Node.js, and MySQL. Designed to help you effortlessly create, manage, and organize your notes with multi-category support — all wrapped in a seamless user experience.

# 🚀 Features

### Notes Management

✍️ Create, Edit & Delete Notes with ease.

📋 View a paginated list of all your notes (4 per page).

🔍 View a single note in detail with title, content, and categories.

✅ Mark notes as complete or incomplete to track your progress.

### Categories

🏷️ Assign multiple categories per note (at least one required).

🔄 Filter notes by category to quickly find what you need.

### User Authentication & Authorization

🛠️ Signup and Login securely.

🔐 Authentication powered by JWT Access and Refresh tokens stored as secure cookies.

🛡️ Middleware ensures secure access to protected routes and APIs.

# 🛠️ Technology Stack
| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | React with TypeScript |
| Backend  | Node.js + Express     |
| Database | MySQL (Workbench)     |


# 🔧 Implementation Highlights

**Secure Authentication**: JWT tokens with access and refresh flow, validated via Express middleware before protected endpoints.

- **Robust Validatio**:

    - Frontend validation using *Zod* schemas for form inputs.

    - Backend manual validation and error handling in *controller methods*.

- **Error Handling**: Graceful UI error notifications with toast messages—no crashes, just friendly feedback.

- **Server-Side Pagination & Filtering**: Efficient SQL queries limit notes per page and filter by categories.

- **Clean & Responsive UI**: Simple, intuitive interface with reusable React components ensuring maintainability and efficiency.

- **Database Design**: Normalized schema designed for scalability and data integrity.

- **Informal API Documentation**: Endpoints tested and documented in *Postman* for easy backend validation.

- **Extra Feature**: Ability to mark notes as complete/incomplete to track task progress.

## Deployment

To deploy this project run

### 1. Clone the repo

```bash
  git clone https://github.com/SahilTuladhar/Note-Application-.git
  cd Note-Application-
```

### 2. Install backend dependencies

```bash
  cd backend-server
  npm install
```

### 3. Install frontend dependencies

```bash
  cd frontend-client
  npm install
```

### 4. Setup MySQL database environment

 #### i. Download MySql Installer from the link :  https://dev.mysql.com/downloads/installer/

 #### ii. Select MySQL server and MySQLWorkbench as options to install, and create a password to get access to the database for future use (make sure to note the password)

 #### iii. After installation process MySQL Server must be running

 #### iv. Create a new connection in workbench, which will prompt you to enter password, enter the previously set password

 #### v. Create an empty schema and import SQL dump file provided: [Lft-db.sql](https://github.com/SahilTuladhar/Note-Application-/tree/main/sql-dump)

 #### vi. The schema and data should be loaded into the schema after this

### 5. Change environment variables in .env file based on the configuration of your database

### 6. Start Backend Server

```bash
  cd backend-server
  npm run dev
```

### 7. Start Frontend Server

```bash
  cd frontend-client
  npm run dev
```
