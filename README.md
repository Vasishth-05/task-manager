# Task Manager API

A RESTful backend service for managing tasks built with **Node.js**, **Express.js**, and **MongoDB / Mongoose**. This application allows users to create, read, update, and delete tasks with support for priority filtering and date-based sorting.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack & Dependencies](#tech-stack--dependencies)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing the API](#testing-the-api)
  - [Automated Tests](#automated-tests)
  - [cURL Examples](#curl-examples)

---

## Overview

The **Task Manager API** is designed to provide a flexible and scalable task management system. Tasks contain attributes such as an integer `id`, `title`, `description`, completion status (`completed`), and priority level (`low`, `medium`, or `high`).

### Key Features
- **CRUD Operations**: Complete control to create, retrieve, update, and delete task records.
- **Filtering**: Filter tasks by completion status (`completed=true/false`) and priority level (`priority=low|medium|high`).
- **Sorting**: Sort tasks chronologically (`sort=newest` or `sort=oldest`).
- **MongoDB Integration**: Schema validation and persistence powered by Mongoose.

---

## Tech Stack & Dependencies

- **Runtime**: Node.js (>= 18.0.0)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Environment Management**: `dotenv`
- **Development Tool**: `nodemon`
- **Testing Framework**: `tap` & `supertest`

---

## Project Structure

```text
task-manager/
├── app.js                   # Application entry point & server setup
├── package.json             # Project dependencies & scripts
├── task.json                # Sample task dataset
├── .env                     # Environment variables configuration
├── src/
│   ├── config/
│   │   └── task.config.js   # MongoDB connection setup
│   ├── controller/
│   │   └── task.controller.js # Request handlers (CRUD logic)
│   ├── models/
│   │   └── task.models.js   # Mongoose schema and Task model definition
│   └── routes/
│       └── task.routes.js   # Route definitions for /api/v1/tasks
└── test/
    └── server.test.js       # Integration test suite
```

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js**: Version 18.x or higher
- **npm**: Node Package Manager (comes with Node.js)
- **MongoDB**: Local MongoDB instance or a remote database URI (e.g., MongoDB Atlas)

---

## Setup Instructions

1. **Clone or Navigate to the Workspace**
   ```bash
   cd /home/vasishth-titarmare/task-manager
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory (or update the existing one):
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/task-manager
   ```

4. **Run the Application**
   - **Development Mode** (with hot reload via `nodemon`):
     ```bash
     npm run dev
     ```
   - Server will start listening on the specified port (e.g., `http://localhost:3000`).

---

## Environment Variables

| Variable | Description | Default / Example Value |
| :--- | :--- | :--- |
| `PORT` | Port number on which the Express server listens | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/task-manager` |

---

## API Endpoints

Base Route: `/api/v1/tasks`

### Data Model Schema

| Field | Type | Required | Description / Allowed Values |
| :--- | :--- | :--- | :--- |
| `id` | `Number` | Yes | Numeric task identifier |
| `title` | `String` | Yes | Title of the task |
| `description` | `String` | Yes | Detailed description of the task |
| `completed` | `Boolean` | Yes | `true` if completed, `false` otherwise |
| `priority` | `String` | No | Priority level: `"low"`, `"medium"`, or `"high"` (default: `"medium"`) |

---

### 1. Get All Tasks
- **URL**: `/api/v1/tasks`
- **Method**: `GET`
- **Query Parameters**:
  - `completed` (optional): `true` or `false`
  - `priority` (optional): `low`, `medium`, or `high`
  - `sort` (optional): `newest` or `oldest`
- **Success Response** (`201 Created` / `200 OK`):
  ```json
  {
    "message": "got all the tasks!",
    "findAllTasks": [
      {
        "_id": "650c123456789abcdef01234",
        "id": 1,
        "title": "Set up environment",
        "description": "Install Node.js, npm, and git",
        "completed": true,
        "priority": "medium",
        "createdAt": "2026-10-06T10:00:00.000Z",
        "updatedAt": "2026-10-06T10:00:00.000Z"
      }
    ]
  }
  ```

---

### 2. Get Task by ID
- **URL**: `/api/v1/tasks/:id`
- **Method**: `GET`
- **URL Params**: `:id` (MongoDB `_id`)
- **Success Response** (`200 OK`):
  ```json
  {
    "message": "Task Found",
    "findTasksById": {
      "_id": "650c123456789abcdef01234",
      "id": 1,
      "title": "Set up environment",
      "description": "Install Node.js, npm, and git",
      "completed": true,
      "priority": "medium"
    }
  }
  ```
- **Error Response** (`404 Not Found`):
  ```json
  {
    "message": "Task not Found"
  }
  ```

---

### 3. Create a New Task
- **URL**: `/api/v1/tasks`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "id": 1,
    "title": "Complete Backend Assignment",
    "description": "Implement task routes and controllers",
    "completed": false,
    "priority": "high"
  }
  ```
- **Success Response** (`201 Created`):
  ```json
  {
    "message": "Task Created Successfully",
    "tasks": {
      "_id": "650c123456789abcdef01234",
      "id": 1,
      "title": "Complete Backend Assignment",
      "description": "Implement task routes and controllers",
      "completed": false,
      "priority": "high"
    }
  }
  ```
- **Error Response** (`400 Bad Request`):
  ```json
  {
    "message": "Tasks validation failed: title: Path `title` is required."
  }
  ```

---

### 4. Update Task by ID
- **URL**: `/api/v1/tasks/:id`
- **Method**: `PUT`
- **Headers**: `Content-Type: application/json`
- **URL Params**: `:id` (MongoDB `_id`)
- **Request Body**:
  ```json
  {
    "title": "Updated Task Title",
    "completed": true
  }
  ```
- **Success Response** (`200 OK`):
  ```json
  {
    "message": "Task is updated successfully",
    "updateTasksById": {
      "_id": "650c123456789abcdef01234",
      "id": 1,
      "title": "Updated Task Title",
      "description": "Implement task routes and controllers",
      "completed": true,
      "priority": "high"
    }
  }
  ```
- **Error Response** (`404 Not Found`):
  ```json
  {
    "message": "Task Does'nt exist"
  }
  ```

---

### 5. Delete Task by ID
- **URL**: `/api/v1/tasks/:id`
- **Method**: `DELETE`
- **URL Params**: `:id` (MongoDB `_id`)
- **Success Response** (`200 OK`):
  ```json
  {
    "message": "Task deleted Successfully.",
    "deleteTasksById": {
      "_id": "650c123456789abcdef01234",
      "id": 1,
      "title": "Updated Task Title"
    }
  }
  ```
- **Error Response** (`404 Not Found`):
  ```json
  {
    "message": "Task doesn't Exist"
  }
  ```

---

## Testing the API

### Automated Tests

The repository includes test suites using `tap` and `supertest`.

To execute the automated tests, run:
```bash
npm test
```

---

### cURL Examples

You can test the endpoints manually using `curl` commands in your terminal:

#### 1. Fetch All Tasks
```bash
curl -X GET http://localhost:3000/api/v1/tasks
```

#### 2. Filter Tasks by Status and Priority
```bash
curl -X GET "http://localhost:3000/api/v1/tasks?completed=false&priority=high&sort=newest"
```

#### 3. Create a Task
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Install Dependencies",
    "description": "Install express, mongoose, and dotenv",
    "completed": false,
    "priority": "high"
  }'
```

#### 4. Fetch Task by MongoDB ID
```bash
curl -X GET http://localhost:3000/api/v1/tasks/<OBJECT_ID>
```

#### 5. Update Task by MongoDB ID
```bash
curl -X PUT http://localhost:3000/api/v1/tasks/<OBJECT_ID> \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

#### 6. Delete Task by MongoDB ID
```bash
curl -X DELETE http://localhost:3000/api/v1/tasks/<OBJECT_ID>
```
