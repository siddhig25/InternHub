# InternHub

InternHub is a full-stack internship portal that helps students find and apply for internship opportunities. Users can browse available internships, view job details, submit applications, upload resumes, and track their application status.

The project also includes an admin dashboard where administrators can view and manage internship applications.

## Features

### User Features

* User registration and login
* Secure password authentication
* Browse internship opportunities
* View internship details
* Apply for internships
* Upload resume while applying
* View submitted applications
* Track application status
* Responsive design for desktop, tablet, and mobile
* Dark and light theme

### Admin Features

* Admin login
* Admin-only dashboard access
* View internship applications
* View applicant details
* View applicant resumes
* Accept applications
* Reject applications
* View application statistics
* Admin logout
* Accepted and rejected applications are removed from the active application list

## Tech Stack

### Frontend

* React.js
* Create React App
* React Router
* Axios
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt.js

### Tools

* Visual Studio Code
* MongoDB Compass
* Postman
* Git
* GitHub

## Project Structure

```text
InternHub/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       ├── App.css
│       └── index.js
│
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/siddhig25/InternHub.git
```

### 2. Open the Project

```bash
cd InternHub
```

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install the required packages:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

## Frontend Setup

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install the required packages:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The application will open at:

```text
http://localhost:3000
```

## Database

InternHub uses MongoDB to store:

* User accounts
* Internship/job information
* Internship applications
* Application status

MongoDB Compass can be used to view and manage the database during development.

## Authentication

InternHub uses JWT-based authentication for login and protected routes.

* bcrypt.js is used for password hashing
* JWT is used for authentication
* User roles are used to control access to the admin dashboard

The two main roles are:

```text
user
admin
```

Only users with the `admin` role can access the Admin Dashboard.

## Admin Dashboard

The Admin Dashboard provides administrators with a central place to manage applications.

Administrators can:

1. View total applications
2. View pending applications
3. View applicant information
4. View applicant resumes
5. Accept applications
6. Reject applications
7. Manage application status

Once an application is accepted or rejected, it is removed from the active application list shown on the Admin Dashboard.

## Responsive Design

The application is designed to work on:

* Desktop
* Tablet
* Mobile

The layout adjusts according to the screen size.

## Theme Support

InternHub supports both:

* Dark mode
* Light mode

Users can switch between the two themes using the theme button in the navigation bar.

## Pages

The application currently includes:

* Home
* About InternHub
* Jobs
* Login
* Signup
* Dashboard
* Applications
* Admin Dashboard

## Future Improvements

Some features that could be added in the future:

* Internship search and filtering
* Email notifications
* Forgot password
* Admin job management
* User profile management
* Application analytics
* Company accounts
* Internship recommendations
* Cloud deployment
* Online resume builder

## Author

**Siddhi Ghodke**

BCA Graduate | Web Development & MERN Stack

## Project Status

**Active Development**

InternHub is a full-stack internship portal developed as a web development project using the MERN stack.


