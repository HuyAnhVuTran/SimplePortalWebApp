# GamerGate website idea

GamerGate is a comprehensive web application prototype designed for the gaming industry, connecting game developers, studios, and professionals. It features a modern, responsive dashboard for managing job applications, portfolios, and resumes.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify

### Backend
- **Framework**: [Spring Boot 3.3.0](https://spring.io/projects/spring-boot)
- **Language**: Java 17
- **Database**: PostgreSQL (Containerized)
- **Security**: Spring Security + JWT
- **Build Tool**: Maven

## ✨ Features

- **User Authentication**: Secure Login and Registration with JWT.
- **Dashboard**: Interactive dashboard for tracking applications and projects.
- **Resume Management**: Upload and manage resumes/CVs (PDF/DOC support).
- **Job Board**: Browse open positions from top studios (Mock data/In Progress).
- **Portfolio**: Showcase game projects (In Progress).
- **Responsive Design**: Glassmorphism UI optimized for all devices.

## 🛠️ Prerequisites

- **Java 17** (Required for Backend)
- **Node.js** (v18+ recommended for Frontend)
- **Docker** (For PostgreSQL database)

## 🏁 Getting Started

### 1. Database Setup

The project uses Docker Compose to spin up a PostgreSQL instance.

```bash
cd ui/backend/backend
docker-compose up -d
```
This will start a PostgreSQL container on port `5433` (mapped to internal 5432).
- **DB Name**: `gamergate`
- **User**: `postgres`
- **Password**: `12345678`

### 2. Backend Setup

Navigate to the backend directory and run the application.

```bash
cd ui/backend/backend
# Windows (PowerShell)
$env:JAVA_HOME="C:\Program Files\Java\jdk-17" # Adjust path if needed
.\mvnw spring-boot:run
```
The backend will start on `http://localhost:8989`.

### 3. Frontend Setup

Navigate to the frontend directory, install dependencies, and start the dev server.

```bash
cd ui/my-app
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`.

## 📂 Project Structure

```
ui/
├── backend/            # Spring Boot Backend
│   └── backend/
│       ├── src/
│       ├── docker-compose.yml
│       └── pom.xml
└── my-app/            # React Frontend
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── screens/
    │   └── services/
    ├── package.json
    └── vite.config.js
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

### Resumes
- `POST /api/resumes/upload` - Upload a resume file (Multipart/form-data)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
