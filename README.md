<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# PROBLEM MARKETPLACE 🎯

## Basic Details

### Team Name: INNOVATRIX

### Team Members
- Member 1: Neeraja Anil - College of Engineering Kallooppara
- Member 2: Gowri Priya S - College of Engineering Kallooppara

### Hosted Project Link
(https://github.com/NeerajaAnil005/problem-marketplace.git)

### Project Description
Problem Marketplace is a web platform that connects people facing real-world problems with developers who can solve them. Users can post problems, and developers can adopt and submit solutions through a structured system. The platform encourages practical problem-solving and collaborative innovation.

### The Problem statement
Many real-world problems remain unsolved because there is no structured platform connecting people who face problems with those who can solve them. Students and developers also lack a space to showcase practical problem-solving skills.

### The Solution
Problem Marketplace provides:

A platform to post real-world problems

A system for developers to adopt problems

A solution submission feature

A structured backend API for managing problems

A scalable MongoDB database for storing data
---


## Technical Details

### Technologies/Components Used

*For Software:*
- Languages used: JavaScript
- Frameworks used:  React.js(Frontend), Express.js(Backend), Node.js
- Libraries used: Axios, Mongoose, CORS , dotenv
- Tools used: VS Code , Git & GitHub, Postman , MongoDB 

---

## Features

List the key features of your project:

Post real-world problems

Browse available problems

Adopt a problem

Submit a solution

View adopted & solved problems

REST API-based backend architecture

MongoDB integration

Clean and modern UI

---

## Implementation

### For Software:

#### Installation
bash
git clone https://github.com/NeerajaAnil005/problem-marketplace.git


#### Run
bash
# Clone the repository
[Run commands - e.g., npm start, python app.py]


# Go to backend
cd backend
npm install

# Go to frontend
cd ../frontend
npm install


## Project Documentation


#### Screenshots (Add at least 3)

<img width="1876" height="903" alt="Screenshot 2026-02-21 080434" src="https://github.com/user-attachments/assets/a5fad8ff-ad73-4683-8984-09d24ba703f7" />

Front page of the website

<img width="1858" height="888" alt="Screenshot 2026-02-21 080456" src="https://github.com/user-attachments/assets/2e9c74ae-d293-487e-be40-c1fd44b57ca2" />

Shows all posted problems.

<img width="1889" height="885" alt="Screenshot 2026-02-21 080708" src="https://github.com/user-attachments/assets/59115438-a10b-4b88-bd85-a7a1ad493aaa" />

Developer dashboard
#### Diagrams

*System Architecture:*

React handles UI and API requests

Express handles routing and logic

MongoDB stores problems and solution

*Application Workflow:*

Frontend (React)
        ↓
Axios API Calls
        ↓
Backend (Express.js)
        ↓
MongoDB Database

---



## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

*Base URL:* https://api.yourproject.com](http://localhost:5000

*POST /api/endpoint*
- *Description:* Create a new problem
- *Request Body:*
json
{
  "title": "Problem title",
  "description": "Problem description"
}

### PUT /api/problems/:id/adopt

Description: Mark a problem as adopted


### PUT /api/problems/:id/solve

Description: Submit a solution

Request Body:

{
  "solution": "This is the solution"
}

## AI Tools Used 

Tool Used: ChatGPT

Purpose:

Backend debugging

CORS issue fixing

API architecture design

Error handling improvements

*Human Contributions:*
Full architecture design

Database schema design

Business logic implementation

UI design decisions

API integration

---

## Team Contributions

### Gowri Priya S

Backend Development

MongoDB Schema Design

API Integration

Debugging & Testing

### Neeraja Anil

Frontend Development

UI/UX Design

Axios Integration

Styling





## Made with ❤️ at TinkerHub
