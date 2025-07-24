# 🎵 Rero Music Backend (`rero-back`)

This is the backend service for **Rero**, a modern music streaming platform. Built with **NestJS**, **TypeORM**, and **MySQL**, it powers all backend operations from user management to track storage, with cloud integration using **Render** for hosting and **AWS S3** for media storage.

---
## 🧰 Tech Stack

- **NestJS** – Scalable and modular Node.js framework
- **TypeORM** – ORM for MySQL database
- **MySQL** – Relational database for storing user and music data
- **Render** – Cloud platform for server hosting
- **AWS S3** – Secure storage for audio files and album art
---

## 📦 Features

- User authentication and profile management
- Music upload and streaming (stored on S3)
- Playlist creation and management
- Artist and album organization
- RESTful API for frontend consumption

---

## 🛠️ Development Setup

```bash
# Clone the repo
git clone https://github.com/Nika-Hisk/rero-back.git
cd rero-back

# Install dependencies
npm install

# Run the app
npm run start:dev
