# COMP229-401 Web Application Development

## SportsPass

### Topic
Backend REST API for a Sports Ticket Management System


---

# Project Overview

SportsPass is a backend REST API developed for managing sports events and ticket information. The system allows users to register, log in securely, and manage sports events through a set of RESTful API endpoints. It provides a foundation for a sports ticket management platform where users can browse events while authenticated users can create, update, and delete event listings.

---

# Technology Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Postman
- Git & GitHub

---

# Features

The backend currently supports:

- User registration with encrypted passwords
- User login using JWT authentication
- Protected routes using authorization middleware
- Create new sports events
- View all available events
- View individual event details
- Update existing events
- Delete (cancel) events
- Input validation and error handling
- MongoDB database integration using Mongoose

---

# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user and return a JWT |
| GET | `/api/events` | Retrieve all sports events |
| GET | `/api/events/:id` | Retrieve a specific sports event |
| POST | `/api/events` | Create a new sports event *(Authentication Required)* |
| PUT | `/api/events/:id` | Update an existing sports event *(Authentication Required)* |
| DELETE | `/api/events/:id` | Delete or cancel a sports event *(Authentication Required)* |