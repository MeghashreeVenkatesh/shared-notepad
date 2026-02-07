# Shared Notepad

A simple real-time collaborative notepad for two users built with:

- Node.js
- Express
- MongoDB (Atlas)
- Vanilla HTML/CSS/JS

This app allows two users to maintain separate notes, toggle visibility, use dark mode, and export notes to PDF.

---

## Features

- Landing page with user selection
- Separate notepad for User 1 and User 2
- Dark mode toggle
- Save notes to cloud database
- Last updated timestamp
- Visibility control between users
- Export notes to PDF

---

## Project Structure

shared-notepad/
│
├── server/
│ ├── server.js
│ └── models/
│ └── Note.js
│
├── public/
│ ├── index.html
│ ├── user.html
│ ├── style.css
│ └── script.js
│
├── package.json
└── README.md


---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <https://github.com/MeghashreeVenkatesh/shared-notepad/>
cd shared-notepad

npm install

## Setup MongoDB Atlas
 - Create account at https://cloud.mongodb.com

- Create a free M0 cluster

Add IP:

Network Access → Allow 0.0.0.0/0

Create DB user:

Username & password

Copy connection string


