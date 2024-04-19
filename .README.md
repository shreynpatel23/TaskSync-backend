# TaskSync Backend

This is a simple Express.js application that uses MongoDB as its database. This README provides an overview of the application and instructions for setting it up.

## Features

- Uses Express.js framework for building web applications.
- Utilizes MongoDB for storing and managing data.
- Provides RESTful API endpoints for interacting with the database.

## Installation

1. Clone the repository: git clone git@github.com:shreynpatel23/TaskSync-backend.git
2. Navigate to the project directory: cd tasksync-backend
3. Install dependencies: npm install
4. Start the application: npm run start
5. Access the application in your browser at `http://localhost:5000`.

## Usage

- The application provides RESTful API endpoints for performing CRUD operations on the MongoDB database.
- Use tools like Postman or curl to interact with the API endpoints.
- Example API endpoints:
  - GET /get-all-projects - Retrieve all projects from the database.
  - POST /create-new-project - Create a new project and adds it in the database.
  - GET /get-all-tasks - Retrieve all tasks from the database.
  - POST /create-new-task - Create a new task and adds it in the database.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.
