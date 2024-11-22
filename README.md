# FutureIntern_FSD_01 Project
** Secure User Authentication
This project is a web application that integrates user authentication and session management using Node.js, Express, MySQL, and the connect-mysql2 library for session storage. It includes dynamic route handling, JSON request body parsing, and static file serving. Below is the detailed project setup and usage guide.

# Features
1. User Authentication

Authentication routes to handle user login and session persistence.
Middleware for secure session management.

2. Session Management

Sessions are securely managed using express-session and stored in MySQL via express-mysql-session.

3. Database Integration

MySQL database integration for storing session data and user-related information.



4. Static File Serving

Serves static files (e.g., HTML, CSS, JS) for client-side rendering.

5. Environment Configuration

Environment variables are used for sensitive information (e.g., database credentials, session secrets).


## Prerequisites
Before running this project, ensure you have the following installed:

Node.js (v22.11.0 or compatible)
MySQL database
npm (Node Package Manager)

## Installation
1. Clone the repository:
git clone https://github.com/sittuk-kibet/FutureIntern_FSD_01.git
cd FutureIntern_FSD_01

2. Install project dependencies:
 npm install

3. Set up the .env file in the project root: 
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=futureintern
PORT=3000
SESSION_SECRET=your_secret_key

4. Initialize the database using MySQL:

Create a database named futureintern.

Run any necessary SQL scripts to set up tables for user data and session storage.

## Usage
1. Start the server:
node index.js
2. Access the application: Open a browser and navigate to http://localhost:3000.

3. Routes:
Static File: http://localhost:3000/index.html serves the default static HTML file.

Authentication: http://localhost:3000/auth handles authentication-related endpoints.

## Technologies Used

Node.js: Backend runtime environment.
Express: Web framework for Node.js.
MySQL: Relational database for data persistence.
dotenv: Environment variable management.
connect-mysql-session: MySQL-based session store for Express.
express-session: Session management middleware.
