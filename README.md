# KYC Document Management System

A full-stack web application for managing KYC (Know Your Customer) documents using a React frontend and a Spring Boot backend.

---

# Overview

The KYC Document Management System is designed to store, manage, and retrieve customer KYC document information in a structured way.  
It demonstrates a real-world full-stack application with proper frontend–backend separation, REST API communication, and CI integration using GitHub Actions.

---

## 🛠 Tech Stack

### Frontend
- React
- JavaScript
- jsx

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs

### Database
- SQL Server

### Tools & DevOps
- Git
- GitHub
- GitHub Actions (CI/CD)
- Maven
- Node.js & NPM

---

## Features

- Create and manage KYC document records
- View customer KYC details
- RESTful backend APIs for data operations
- Frontend and backend integration
- Automated CI pipeline using GitHub Actions

---

# Project Structure
kyc-app/
├── frontend/ # React frontend application
├── backend/ # Spring Boot backend application
├── .github/ # GitHub Actions workflows
├── .gitignore
└── README.md

# How to Run the Project Locally

### Prerequisites
- Java 17+
- Node.js 18+
- Maven
- Git

---

### Backend Setup (Spring Boot)

```bash
cd backend
mvn spring-boot:run

backend will start at 
http://localhost:8080

### front end setup

cd frontend
npm install
npm run dev

Frontend will start at:

http://localhost:5173

CI Configration available at:
.github/workflows/ci.yml