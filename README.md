# AuthFeedback System

A full-stack MERN application for user authentication and feedback management.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn
- Gmail account (for sending emails)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
- Copy `.env.example` to `.env`
- Fill in your configuration values:
  - Set up MongoDB URI
  - Configure email settings (Gmail)
  - Set JWT secret
  - Configure Google OAuth credentials

4. Start the backend server:
```bash
npm run dev
```

The server will start on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
- Copy `.env.example` to `.env`
- Update the configuration values:
  - Set API URL
  - Add Google OAuth client ID

4. Start the frontend development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

## Features

- User Authentication (Email/Password and Google OAuth)
- Email verification with OTP
- Password reset functionality
- Feedback submission system
- Protected routes
- User profile management

## Email Configuration

To enable email functionality (OTP and password reset):

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password
4. Use the generated password in your backend .env file

## Available Scripts

Backend:
- `npm run dev`: Start development server
- `npm start`: Start production server

Frontend:
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
