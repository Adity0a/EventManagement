# Event Management System

A full-stack event management platform built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to discover, search, and register for events, while providing administrators with a powerful dashboard to manage events and registrations.

## Features

### For Users
- **Event Discovery:** Browse through a wide range of events across various categories.
- **Advanced Search:** Search for events by title and location.
- **Category Filtering:** Quickly find events that match your interests.
- **Event Details:** Detailed event information including date, time, location (with Google Maps integration), host details, and agenda.
- **Secure Registration:** Sign up and register for events seamlessly using Clerk authentication.
- **Ticket Generation:** Download event tickets as PDF files for offline use.

### For Administrators
- **Admin Dashboard:** Overview of total events, total registrations, and recent activity.
- **AI-Powered Content:** Generate professional event descriptions using Groq (Llama 3.3).
- **Event Management:** Add, edit, and delete events with ease.
- **Rich Text Editing:** Use a built-in rich text editor for detailed event descriptions.
- **Image Upload:** Upload event banners and images via ImageKit integration.
- **Publishing Control:** Toggle event visibility (Published/Unpublished).

## Tech Stack

**Frontend:**
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Maps:** Google Maps API
- **Editor:** React Quill (Rich Text Editor)
- **PDF Export:** jspdf & html2canvas

**Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** Clerk SDK
- **AI Integration:** Groq SDK (Llama 3.3)
- **Image Hosting:** ImageKit SDK

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas account or a local MongoDB instance.
- Clerk account for authentication.
- Groq API key for AI features.
- ImageKit account for image hosting.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd event_management
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_uri
   CLERK_SECRET_KEY=your_clerk_secret_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   GROQ_API_KEY=your_groq_api_key
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   JWT_SECRET=your_jwt_secret
   ```

3. **Frontend Setup:**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the `client` directory and add the following:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_BACKEND_URL=http://localhost:4000
   ```

### Running the Application

1. **Start the Backend:**
   ```bash
   cd server
   npm start
   ```

2. **Start the Frontend:**
   ```bash
   cd client
   npm run dev
   ```

## Project Structure
```
event_management/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # App context and state management
│   │   ├── pages/       # User and Admin pages
│   │   └── assets/      # Static assets
├── server/              # Backend Node.js/Express application
│   ├── config/          # DB and SDK configurations
│   ├── controllers/     # API route handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API route definitions
│   └── middleware/      # Custom middlewares (Auth, etc.)
```

## License
Distributed under the ISC License.
