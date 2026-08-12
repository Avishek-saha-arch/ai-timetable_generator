# Planify AI — Running Guide

This README contains only the instructions required to install, configure, build, start, stop, restart, and troubleshoot the Planify AI project.

---

## 1. Project Structure

The project is a Docker Compose application containing:

```text
ai-timetable_generator/
│
├── docker-compose.yml
├── .gitignore
├── README.md
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── backend/
│   ├── Dockerfile
│   ├── .env
│   ├── app.py
│   └── requirements.txt
│
└── ai-services/
    └── document-reader/
        ├── Dockerfile
        ├── .env
        ├── requirements.txt
        └── app.py
```

> Keep `.env` files out of Git. They normally contain secrets and configuration values.

---

# 2. Requirements

## Required Software

Install the following on the development machine:

- Windows 10/11
- Git
- Docker Desktop
- WSL 2
- Ubuntu or another WSL 2 Linux distribution
- Internet connection

The project is currently configured to run using Docker Desktop with the WSL 2 backend.

---

# 3. Check Docker Installation

Open PowerShell and run:

```powershell
docker --version
```

Example:

```text
Docker version 29.x.x
```

Then:

```powershell
docker compose version
```

Then verify that Docker Engine is running:

```powershell
docker info
```

The command should display both a `Client` and a `Server` section.

If `docker` is not recognized, start Docker Desktop and make sure Docker Desktop is installed correctly.

---

# 4. Check WSL 2

Run:

```powershell
wsl --status
```

Then:

```powershell
wsl -l -v
```

You should see your Linux distribution using version `2`.

Example:

```text
NAME      STATE     VERSION
Ubuntu    Running   2
```

If WSL is not installed:

```powershell
wsl --install
```

After installation, restart Windows if requested.

You can install Ubuntu with:

```powershell
wsl --install -d Ubuntu
```

---

# 5. Start Docker Desktop

Before running the project:

1. Open **Docker Desktop**.
2. Wait until Docker reports that it is running.
3. Open PowerShell.
4. Navigate to the project root.

Example:

```powershell
cd C:\projects\schoolmanagementsystem_ai\ai-timetable_generator
```

Verify:

```powershell
docker info
```

---

# 6. Environment Files

The project uses environment files for configuration and secrets.

Expected files:

```text
backend/.env
frontend/.env
ai-services/document-reader/.env
```

Do not commit these files to Git.

The Docker Compose file loads the backend and document-reader environment files:

```yaml
env_file:
  - ./backend/.env
```

and:

```yaml
env_file:
  - ./ai-services/document-reader/.env
```

The frontend `.env` is used by the frontend application itself.

---

# 7. Backend Dependencies

The backend Dockerfile installs Python dependencies from:

```text
backend/requirements.txt
```

Make sure every Python package imported by the backend is listed there.

For example, if the backend uses:

```python
from dotenv import load_dotenv
```

the requirements file must contain:

```text
python-dotenv
```

If the timetable generator uses OR-Tools:

```text
ortools
```

must also be included.

Other project dependencies may include:

```text
Flask
flask-cors
pandas
scikit-learn
joblib
openpyxl
supabase
python-dotenv
ortools
```

Use the actual versions required by the project.

---

# 8. Document Reader Dependencies

The document-reader service has its own:

```text
ai-services/document-reader/requirements.txt
```

The Dockerfile automatically installs those dependencies when the image is built.

Typical dependencies currently used by the service include:

```text
fastapi
uvicorn
sqlalchemy
paddlepaddle
paddleocr
ollama
Pillow
PyMuPDF
python-multipart
python-dotenv
```

Do not manually install these inside the Docker container every time. They should be maintained in `requirements.txt`.

---

# 9. Frontend Dependencies

The frontend uses Node.js and npm.

Dependencies are defined in:

```text
frontend/package.json
```

and locked in:

```text
frontend/package-lock.json
```

The frontend Dockerfile automatically runs:

```bash
npm install
```

during image creation.

You normally do not need to run `npm install` manually when using Docker.

---

# 10. Build the Project

From the project root:

```powershell
cd C:\projects\schoolmanagementsystem_ai\ai-timetable_generator
```

Build all services:

```powershell
docker compose build
```

Or build and start everything:

```powershell
docker compose up --build
```

The first build can take a while because Docker has to download base images and install dependencies.

---

# 11. Start the Complete Application

Recommended command:

```powershell
docker compose up
```

Or, when code/dependencies have changed:

```powershell
docker compose up --build
```

The three main services are:

```text
Frontend          → 5173
Backend           → 5000
Document Reader   → 8001
```

---

# 12. Open the Application

After the containers start, open the frontend in your browser:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

Document reader:

```text
http://localhost:8001
```

The exact available API routes depend on the application's backend implementation.

---

# 13. Run Only One Service

You can start an individual service when developing.

## Backend

```powershell
docker compose up backend
```

## Document Reader

```powershell
docker compose up document-reader
```

## Frontend

```powershell
docker compose up frontend
```

If dependencies or Dockerfiles have changed:

```powershell
docker compose up --build backend
```

or:

```powershell
docker compose up --build document-reader
```

or:

```powershell
docker compose up --build frontend
```

---

# 14. Run in the Background

If you do not want the terminal attached to the containers:

```powershell
docker compose up -d
```

Or:

```powershell
docker compose up -d --build
```

You can continue using the same PowerShell window.

---

# 15. View Running Containers

Run:

```powershell
docker compose ps
```

You should see something similar to:

```text
NAME                       STATUS
planify-backend             Up
planify-document-reader    Up
planify-frontend            Up
```

You can also run:

```powershell
docker ps
```

---

# 16. View Logs

View all service logs:

```powershell
docker compose logs
```

Follow logs live:

```powershell
docker compose logs -f
```

Backend only:

```powershell
docker compose logs -f backend
```

Document reader only:

```powershell
docker compose logs -f document-reader
```

Frontend only:

```powershell
docker compose logs -f frontend
```

Press:

```text
CTRL + C
```

to stop following the logs.

---

# 17. Stop the Application

If the application is running in the terminal with:

```powershell
docker compose up
```

press:

```text
CTRL + C
```

Then stop/remove the Compose containers:

```powershell
docker compose down
```

---

# 18. Restart the Application

Normal restart:

```powershell
docker compose restart
```

Restart one service:

```powershell
docker compose restart backend
```

For code/dependency/Dockerfile changes, use:

```powershell
docker compose up --build
```

---

# 19. Rebuild After Changing requirements.txt

Whenever you add or remove a Python package from:

```text
backend/requirements.txt
```

rebuild the backend image:

```powershell
docker compose build backend
```

Then:

```powershell
docker compose up backend
```

For the document reader:

```powershell
docker compose build document-reader
```

Then:

```powershell
docker compose up document-reader
```

For frontend package changes:

```powershell
docker compose build frontend
```

Then:

```powershell
docker compose up frontend
```

---

# 20. Complete Clean Rebuild

If something becomes inconsistent and you want to rebuild the application images:

```powershell
docker compose down
docker compose build --no-cache
docker compose up
```

Use `--no-cache` only when necessary because it makes the build slower.

A normal rebuild is usually enough:

```powershell
docker compose down
docker compose build
docker compose up
```

---

# 21. Check Images

List Docker images:

```powershell
docker images
```

You should see images created for the project, such as:

```text
ai-timetable_generator-backend
ai-timetable_generator-document-reader
ai-timetable_generator-frontend
```

The exact image names can vary depending on the Compose project name.

---

# 22. Check Containers

List all containers:

```powershell
docker ps -a
```

If a container exited unexpectedly, inspect its logs:

```powershell
docker compose logs backend
```

or:

```powershell
docker compose logs document-reader
```

or:

```powershell
docker compose logs frontend
```

---

# 23. Enter a Running Container

For debugging, you can open a shell inside a container.

Backend:

```powershell
docker compose exec backend sh
```

Document reader:

```powershell
docker compose exec document-reader sh
```

Frontend:

```powershell
docker compose exec frontend sh
```

To leave the container:

```bash
exit
```

---

# 24. Check Python Dependencies Inside Backend

Inside the backend container:

```bash
python --version
```

Check installed packages:

```bash
pip list
```

Test important imports:

```bash
python -c "import flask, flask_cors, pandas, sklearn, joblib, ortools, openpyxl; print('Backend dependencies OK')"
```

If an import fails:

1. Add the missing package to `backend/requirements.txt`.
2. Rebuild the image.
3. Start the backend again.

Example:

```powershell
docker compose build backend
docker compose up backend
```

---

# 25. Common Dependency Error

If Docker shows:

```text
ModuleNotFoundError: No module named 'dotenv'
```

the package name required in `requirements.txt` is:

```text
python-dotenv
```

Not:

```text
dotenv
```

After adding it:

```powershell
docker compose build backend
docker compose up backend
```

---

# 26. Common OR-Tools Error

If you see:

```text
ModuleNotFoundError: No module named 'ortools'
```

add:

```text
ortools
```

to:

```text
backend/requirements.txt
```

Then rebuild:

```powershell
docker compose build backend
```

and start:

```powershell
docker compose up backend
```

---

# 27. Common Docker Compose YAML Error

If Docker reports something like:

```text
mapping key "build" already defined
```

the `docker-compose.yml` contains a YAML structure error.

Check the file:

```powershell
Get-Content docker-compose.yml
```

Each service should have only one `build:` block.

Validate the Compose file with:

```powershell
docker compose config
```

If the YAML is valid, Docker will print the resolved Compose configuration.

If it is invalid, Docker will report the problematic location.

---

# 28. Check Compose Configuration Before Starting

This is a useful command:

```powershell
docker compose config
```

Run it whenever you modify:

```text
docker-compose.yml
```

It catches many YAML and configuration mistakes before containers are started.

---

# 29. Dockerfile Changes

The project currently has Dockerfiles for:

```text
backend/Dockerfile
frontend/Dockerfile
ai-services/document-reader/Dockerfile
```

If you modify a Dockerfile, rebuild the affected service:

```powershell
docker compose build backend
```

or:

```powershell
docker compose build frontend
```

or:

```powershell
docker compose build document-reader
```

Then start it.

---

# 30. Development Volumes

The current Compose configuration mounts the backend and document-reader source directories into their containers.

For example:

```yaml
volumes:
  - ./backend:/app
```

This means source-code changes can appear inside the running container without rebuilding the image.

However, dependency changes still require an image rebuild because Python packages are installed during the image build.

Frontend development similarly depends on the current Docker/Compose configuration.

---

# 31. Daily Development Workflow

Once Docker Desktop is installed and the project is configured, the normal workflow should be:

### Step 1 — Start Docker Desktop

Make sure Docker is running.

### Step 2 — Open PowerShell

Navigate to the project:

```powershell
cd C:\projects\schoolmanagementsystem_ai\ai-timetable_generator
```

### Step 3 — Start everything

```powershell
docker compose up
```

### Step 4 — Open frontend

```text
http://localhost:5173
```

### Step 5 — Develop

Modify the source code normally.

### Step 6 — If only source code changed

Restart/reload the affected service if required.

### Step 7 — If dependencies changed

Rebuild:

```powershell
docker compose up --build
```

### Step 8 — When finished

```powershell
docker compose down
```

---

# 32. Recommended One-Command Startup

For normal development, the main command should be:

```powershell
docker compose up --build
```

After everything is already built, use:

```powershell
docker compose up
```

If you prefer running in the background:

```powershell
docker compose up -d
```

Then check:

```powershell
docker compose ps
```

---

# 33. Full Reset

If containers are behaving unexpectedly:

```powershell
docker compose down
docker compose up --build
```

If you specifically need a clean image rebuild:

```powershell
docker compose down
docker compose build --no-cache
docker compose up
```

Do not delete Docker volumes unless you understand what data they contain.

---

# 34. Git and Docker Files

The following should normally remain ignored by Git:

```text
node_modules/
frontend/node_modules/
frontend/dist/

venv/
.venv/
__pycache__/
*.pyc

.env
*.env

.vscode/
.idea/

Thumbs.db
.DS_Store
```

Docker uses `.dockerignore` to prevent unnecessary files from being copied into images.

For example:

```text
frontend/.dockerignore
```

can contain:

```text
node_modules/
dist/
.git/
.env
```

This is separate from `.gitignore`.

---

# 35. Important Difference: .gitignore vs .dockerignore

### `.gitignore`

Controls what Git does not send to the repository.

Example:

```text
.env
node_modules/
venv/
```

### `.dockerignore`

Controls what Docker does not send into the Docker build context.

Example:

```text
node_modules/
dist/
.git/
.env
```

They serve different purposes.

---

# 36. New Computer Setup

When moving the project to another computer:

### Step 1

Install:

- Git
- Docker Desktop
- WSL 2
- Ubuntu/WSL distribution

### Step 2

Clone the repository:

```powershell
git clone <YOUR_REPOSITORY_URL>
```

### Step 3

Enter the project:

```powershell
cd ai-timetable_generator
```

### Step 4

Create the required `.env` files.

For example:

```text
backend/.env
frontend/.env
ai-services/document-reader/.env
```

Use the project's required environment values.

### Step 5

Build:

```powershell
docker compose build
```

### Step 6

Start:

```powershell
docker compose up
```

Docker downloads the required base images and installs the dependencies specified in the Dockerfiles/requirements/package files.

You do not need to copy your local `node_modules` or Python virtual environment to the new computer.

---

# 37. If Docker Is Not Recognized

If PowerShell says:

```text
docker : The term 'docker' is not recognized
```

check:

```powershell
docker --version
```

If it still fails:

1. Confirm Docker Desktop is installed.
2. Start Docker Desktop.
3. Close PowerShell.
4. Open a new PowerShell window.
5. Run:

```powershell
docker --version
```

If necessary, restart Windows after Docker installation.

---

# 38. If WSL 2 Does Not Start

Run:

```powershell
wsl --status
```

Then:

```powershell
wsl -l -v
```

Virtualization must be enabled in the system firmware/BIOS.

You can check from PowerShell:

```powershell
Get-CimInstance Win32_Processor |
Select-Object Name, VirtualizationFirmwareEnabled
```

You want:

```text
VirtualizationFirmwareEnabled : True
```

---

# 39. If a Container Keeps Restarting

Check:

```powershell
docker compose ps
```

Then:

```powershell
docker compose logs -f <service-name>
```

For example:

```powershell
docker compose logs -f backend
```

Look at the **first Python/Node error**, not just the final restart message.

Common causes:

- Missing dependency
- Missing `.env` variable
- Incorrect import
- Wrong port
- Invalid configuration
- Application startup error
- Incorrect Dockerfile
- Invalid Compose configuration

---

# 40. Ports Used by the Project

| Service | Container Port | Local Port |
|---|---:|---:|
| Frontend | 5173 | 5173 |
| Backend | 5000 | 5000 |
| Document Reader | 8001 | 8001 |

URLs:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:5000

Document Reader:
http://localhost:8001
```

---

# 41. Final Quick Commands

## Start everything

```powershell
docker compose up
```

## Build and start

```powershell
docker compose up --build
```

## Start in background

```powershell
docker compose up -d
```

## Stop everything

```powershell
docker compose down
```

## Restart

```powershell
docker compose restart
```

## Check status

```powershell
docker compose ps
```

## View all logs

```powershell
docker compose logs -f
```

## Backend logs

```powershell
docker compose logs -f backend
```

## Document reader logs

```powershell
docker compose logs -f document-reader
```

## Frontend logs

```powershell
docker compose logs -f frontend
```

## Rebuild backend

```powershell
docker compose build backend
```

## Rebuild everything

```powershell
docker compose build
```

## Clean rebuild

```powershell
docker compose down
docker compose build --no-cache
docker compose up
```

## Validate Compose

```powershell
docker compose config
```

---

# 42. Simplest Way to Remember

For normal daily development:

```powershell
cd C:\projects\schoolmanagementsystem_ai\ai-timetable_generator
docker compose up
```

If something changed that requires rebuilding:

```powershell
docker compose up --build
```

Open:

```text
http://localhost:5173
```

When finished:

```powershell
docker compose down
```

That's the normal development cycle.

---

# 43. Important Rule

Do not manually start separate terminals for:

```text
Python backend
FastAPI document reader
Node/Vite frontend
```

when using Docker Compose.

Docker Compose is intended to manage the services together.

Your goal is to have one main command:

```powershell
docker compose up
```

and let Docker manage the application containers.

---

## End

This document is intentionally focused on **running and operating the project**. It does not describe the complete system architecture or business logic.
