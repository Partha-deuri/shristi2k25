# Shristi2k25 - Official Website

## Overview
Shristi2k25 is the official website for **Shristi**, the annual technical fest of **NERIST**. Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), this website provides a platform for event registrations, announcements, and interactive engagement for participants and organizers.

## Features
- **User Authentication** (Signup, Login, Admin Panel)
- **Event Listings & Registrations**
- **Real-time Updates & Notifications**
- **Separate User & Developer Dashboards**
- **Admin Panel for Event Management**
- **Secure Payment Integration (if applicable)**
- **Responsive UI**

## Tech Stack
- **Frontend:** React.js, Redux (if used), Tailwind CSS/Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token) / OAuth (if applicable)
<!-- - **Hosting:** Vercel / Netlify (Frontend), Render / AWS / DigitalOcean (Backend) -->

## Installation & Setup
### Prerequisites
- Node.js (>= 16.x)
- MongoDB (Local/Cloud - MongoDB Atlas)
- Git

### Clone the Repository
```sh
git clone https://github.com/your-username/shristi2k25.git
cd shristi2k25
```

### Backend Setup
```sh
cd backend
npm install
cp .env.example .env  # Add necessary environment variables
npm start
```

### Frontend Setup
```sh
cd frontend
npm install
npm start
```

## Environment Variables (.env)
```
# Backend (in backend/.env)
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```
```
# Frontend (in frontend/.env)
REACT_APP_API_URL=http://localhost:5000
```

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to your branch (`git push origin feature-xyz`).
5. Submit a pull request.


## Contact
For queries, contact:
- **Team Shristi** - shristi@nerist.ac.in
- **Maintainer:** Parthapratim Deuri

