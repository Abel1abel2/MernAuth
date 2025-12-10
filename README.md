MERN Secure Authentication System
This project is a robust and secure full-stack authentication system built using the MERN stack (MongoDB, Express.js, React, Node.js). It features advanced security measures, including multi-factor authentication (MFA) via OTP, secure password handling, and seamless social login integration.
🚀 Features
User Registration & Login: Standard email/password authentication with JSON Web Tokens (JWT) for session management.
OTP Verification: Email verification is mandatory via a 6-digit One-Time Password (OTP) sent upon registration and for password reset requests.
Secure Password Management: Passwords are securely hashed using bcrypt.js to ensure they are never stored in plaintext in the database.
OAuth Integration (Google): Seamless sign-in using Google accounts for a smooth user experience.
Multi-Provider Email Service: Configured to send emails using both Nodemailer (via SMTP) and the Brevo (formerly Sendinblue) API for reliability and flexibility in production.
Protected Routes: Custom middleware ensures that sensitive routes and user dashboards are only accessible to authenticated and verified users.
Environment Variable Management: Secure storage of API keys, database credentials, and secrets using .env files.
🛠️ Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB (using Mongoose ODM)
Authentication: JWT, bcrypt.js, Google OAuth 2.0, Passport.js (for Google login)
Email Services: Nodemailer, Brevo API
