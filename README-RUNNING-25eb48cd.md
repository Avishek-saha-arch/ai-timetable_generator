# Planify AI — Quick Setup & Run

This README contains only the steps required to get the project running with Docker.

The project is designed so that Docker Compose builds and starts the frontend, backend, and document-reader services together.

---

## 1. Requirements

You need:

- Git
- Docker Desktop
- Access to this repository
- The required environment variables (`.env` files)

You do **not** need to manually install the project's Python or Node.js dependencies.

---

## 2. Clone the Project

```powershell
git clone <REPOSITORY_URL>
cd ai-timetable_generator
```

---

## 3. Configure Environment Files

Before starting the project, make sure the required `.env` files are configured:

```text
backend/.env
frontend/.env
ai-services/document-reader/.env
```

If the repository provides `.env.example` files, copy them to `.env` and add the required values.

**Do not commit real `.env` files or secrets to Git.**

---

## 4. Start Everything

From the project root, run:

```powershell
docker compose up --build
```

This single command handles the complete application startup.

Docker Compose will:

1. Build the backend image.
2. Install the backend Python dependencies.
3. Build the document-reader image.
4. Install the document-reader dependencies.
5. Build the frontend image.
6. Install the frontend npm dependencies.
7. Create the Docker network.
8. Create the containers.
9. Start all services.

You do **not** need to manually run:

```text
pip install ...
npm install ...
python app.py
uvicorn ...
npm run dev
```

when using Docker Compose.

---

## 5. Open the Application

After Docker Compose starts successfully, open:

```text
http://localhost:5173
```

The services use these local ports:

| Service | Address |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| Document Reader | http://localhost:8001 |

The frontend is the main application entry point.

---

## 6. First Run vs Normal Run

### First run

Use:

```powershell
docker compose up --build
```

The first build can take some time because Docker needs to download images and install dependencies.

### Later runs

After the images have already been built:

```powershell
docker compose up
```

### After dependency or Docker configuration changes

Use:

```powershell
docker compose up --build
```

---

## 7. Run in the Background

If you do not want Docker logs attached to your terminal:

```powershell
docker compose up -d
```

Then open:

```text
http://localhost:5173
```

Check the services with:

```powershell
docker compose ps
```

---

## 8. Stop the Project

To stop the project:

```powershell
docker compose down
```

---

## 9. Normal Development Workflow

### First time on a new computer

```powershell
git clone <REPOSITORY_URL>
cd ai-timetable_generator
docker compose up --build
```

Then open:

```text
http://localhost:5173
```

### Every other time

```powershell
cd ai-timetable_generator
docker compose up
```

When finished:

```powershell
docker compose down
```

---

## 10. When You Need to Rebuild

Run:

```powershell
docker compose up --build
```

after changing things such as:

- `Dockerfile`
- `docker-compose.yml`
- `backend/requirements.txt`
- `ai-services/document-reader/requirements.txt`
- `frontend/package.json`
- `frontend/package-lock.json`

For normal source-code changes, a rebuild is generally not required unless the current development setup requires it.

---

## 11. Check Whether Everything Is Running

Run:

```powershell
docker compose ps
```

The main services should be running:

```text
planify-backend
planify-document-reader
planify-frontend
```

---

## 12. View Logs

To view all service logs:

```powershell
docker compose logs -f
```

Press:

```text
CTRL + C
```

to stop following the logs.

This does not normally remove the containers.

---

## 13. If Something Fails

First try:

```powershell
docker compose down
docker compose up --build
```

Then check:

```powershell
docker compose logs
```

Look for the first actual error in the output.

---

## 14. Validate Docker Compose

If there is a problem with `docker-compose.yml`, run:

```powershell
docker compose config
```

This checks whether the Compose configuration is valid.

---

## 15. Dependency Errors

If you get an error such as:

```text
ModuleNotFoundError: No module named 'dotenv'
```

make sure the required package is listed in the correct `requirements.txt`.

For `dotenv`, the package name is:

```text
python-dotenv
```

After correcting the dependency file:

```powershell
docker compose up --build
```

Docker will rebuild the image and install the dependency.

---

## 16. Clean Rebuild

Normally use:

```powershell
docker compose down
docker compose up --build
```

If a completely fresh image build is required:

```powershell
docker compose down
docker compose build --no-cache
docker compose up
```

Use `--no-cache` only when necessary.

---

## 17. Important Project Files

The Docker setup is controlled mainly by:

```text
docker-compose.yml

backend/
├── Dockerfile
├── requirements.txt
└── .env

frontend/
├── Dockerfile
├── package.json
├── package-lock.json
└── .env

ai-services/
└── document-reader/
    ├── Dockerfile
    ├── requirements.txt
    └── .env
```

`docker-compose.yml` coordinates the services.

The individual `Dockerfile` files define how each service's image is built.

---

# Quick Start

For someone who already has Git and Docker configured, the entire setup is:

```powershell
git clone <REPOSITORY_URL>
cd ai-timetable_generator
docker compose up --build
```

Then:

```text
Open → http://localhost:5173
```

After the first build:

```powershell
docker compose up
```

When finished:

```powershell
docker compose down
```

---

# The Whole Process

```text
Clone repository
       ↓
Configure .env files
       ↓
docker compose up --build
       ↓
Backend image built
       ↓
Document-reader image built
       ↓
Frontend image built
       ↓
Dependencies installed automatically
       ↓
Docker network created
       ↓
All containers started
       ↓
Open http://localhost:5173
```

**The goal is simple: one Compose command starts the complete application.**
