# Planify AI --- School Management & Intelligent Timetable System

> A containerized school-management platform with a React frontend,
> Flask backend, AI document processing, intelligent timetable
> generation, and Supabase-backed data services.

------------------------------------------------------------------------

## 1. Project Overview

**Planify AI** is a school-management system designed to bring
administration, student management, attendance, timetable generation,
document processing, and AI-assisted workflows into one application.

The project is organized as a multi-service application:

``` text
                         ┌──────────────────────────┐
                         │       Administrator       │
                         │       / School User       │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │     React + Vite UI      │
                         │       Frontend :5173     │
                         └────────────┬─────────────┘
                                      │ HTTP / REST
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
          ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐
          │ Flask Backend  │  │ Document Reader│  │ Future AI /      │
          │     :5000      │  │    FastAPI :8001│  │ AI Services      │
          └───────┬────────┘  └───────┬────────┘  └─────────────────┘
                  │                    │
                  │                    │ OCR / document
                  │                    │ extraction
                  ▼                    ▼
          ┌────────────────────────────────────────────┐
          │                  Supabase                  │
          │       Authentication / Database / Data    │
          └────────────────────────────────────────────┘
```

Docker Compose runs the application services together so the developer
can start the development environment with one command.

------------------------------------------------------------------------

# 2. Main Goals

The system is intended to provide:

-   Administrative login and dashboard access
-   User and student management
-   Student dashboard functionality
-   Attendance workflows
-   Smart timetable generation
-   AI-assisted document reading
-   Structured extraction of information from uploaded documents
-   Centralized data storage through Supabase
-   REST APIs between the frontend and backend services
-   Containerized development
-   Reproducible dependency installation
-   A scalable service-oriented architecture

------------------------------------------------------------------------

# 3. Technology Stack

## Frontend

The frontend is built with:

-   React 18
-   Vite
-   React Router
-   Axios
-   Zustand
-   Tailwind CSS
-   Framer Motion
-   Lucide React
-   Recharts
-   React Dropzone

Development server:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

## Backend

The main backend is built with:

-   Python
-   Flask
-   Flask-CORS
-   Python-dotenv
-   Pandas
-   Scikit-learn
-   Joblib
-   OR-Tools
-   OpenPyXL
-   Supabase-related integration

Development server:

``` text
http://localhost:5000
```

The backend is responsible for API routing, business logic,
authentication-related operations, student/user operations, timetable
logic, and communication with the data layer.

------------------------------------------------------------------------

## Document Reader

The document-processing service is built with:

-   FastAPI
-   Uvicorn
-   SQLAlchemy
-   PaddlePaddle
-   PaddleOCR
-   Ollama
-   Pillow
-   PyMuPDF
-   Python Multipart
-   Python-dotenv

Development server:

``` text
http://localhost:8001
```

This service is intended to handle document uploads and
document-processing workflows such as PDF/image processing and OCR.

------------------------------------------------------------------------

## Database

The project uses:

**Supabase**

Supabase acts as the centralized application data platform.

The application can use Supabase for persistent school-management data
such as:

-   Users
-   Students
-   Classes
-   Attendance
-   Timetable-related data
-   Other application records

The exact database tables and schema are application-specific and should
remain documented alongside the backend/database implementation as the
project evolves.

------------------------------------------------------------------------

## Containerization

The application uses:

-   Docker
-   Docker Compose
-   Docker Desktop
-   WSL 2 on Windows

Each major application service has its own Dockerfile.

------------------------------------------------------------------------

# 4. Repository Structure

The high-level repository currently follows this structure:

``` text
ai-timetable_generator/
│
├── .git/
├── .gitignore
├── docker-compose.yml
├── package-lock.json
│
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   ├── app.py
│   ├── ai/
│   ├── database/
│   ├── routes/
│   └── services/
│
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   ├── src/
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── ai-services/
    ├── document-reader/
    │   ├── Dockerfile
    │   ├── .env
    │   ├── requirements.txt
    │   ├── app.py
    │   ├── uploads/
    │   ├── temp_images/
    │   └── ...
    │
    └── routine-generator/
        ├── requirements.txt
        └── ...
```

The repository can grow with additional AI services without requiring
the frontend or primary backend to become one large application.

------------------------------------------------------------------------

# 5. Architecture

## 5.1 Presentation Layer

The React frontend is the presentation layer.

Users interact with:

-   Login
-   Dashboard
-   Student management
-   Attendance
-   Timetable
-   Notifications
-   Other school-management modules

The frontend communicates with backend APIs using HTTP requests,
primarily through Axios.

The frontend should not directly contain sensitive database credentials.

------------------------------------------------------------------------

# 6. Authentication Flow

A typical authentication flow is:

``` text
User
 │
 ▼
Login Page
 │
 │ credentials
 ▼
Frontend
 │
 │ POST /api/auth/...
 ▼
Flask Backend
 │
 ▼
Authentication / Supabase
 │
 ▼
Authentication result
 │
 ▼
Frontend
 │
 ▼
Dashboard
```

After authentication, the frontend uses the authenticated session/token
information when making protected API requests.

The backend remains responsible for validating authentication and
applying authorization/business rules.

------------------------------------------------------------------------

# 7. Dashboard Flow

The dashboard is the central user-facing workspace.

A typical flow is:

``` text
Login
  │
  ▼
Dashboard
  │
  ├── Student Management
  │
  ├── Attendance
  │
  ├── Smart Timetable
  │
  ├── Notifications
  │
  ├── Documents / AI Processing
  │
  └── Other ERP Modules
```

The dashboard does not need to directly know how the underlying data is
stored.

Instead:

``` text
Dashboard
    ↓
Frontend service/API layer
    ↓
Backend API
    ↓
Business/service layer
    ↓
Database / AI service
```

This separation makes the application easier to maintain.

------------------------------------------------------------------------

# 8. Backend Architecture

The Flask backend is organized around routes and services.

Conceptually:

``` text
backend/
│
├── app.py
│
├── routes/
│   ├── auth.py
│   ├── users.py
│   ├── students.py
│   └── timetable.py
│
├── services/
│   ├── auth_services.py
│   ├── student_services.py
│   └── ...
│
├── database/
│   └── Supabase integration
│
└── ai/
    └── AI-related backend functionality
```

## `app.py`

The Flask application entry point:

``` text
app.py
    ↓
creates Flask application
    ↓
enables CORS
    ↓
registers blueprints
    ↓
starts server
```

The application currently exposes routes through blueprint prefixes such
as:

``` text
/api/auth
/api/users
/api/students
```

Timetable functionality is also integrated through a timetable blueprint
when enabled.

------------------------------------------------------------------------

# 9. Route Layer

Routes are responsible for receiving HTTP requests and returning HTTP
responses.

Example conceptual flow:

``` text
HTTP Request
     ↓
Route
     ↓
Validation
     ↓
Service
     ↓
Database / AI
     ↓
Response
```

A route should not become the location for all business logic.

For example:

``` text
routes/students.py
        ↓
student_services.py
        ↓
Supabase
```

This keeps responsibilities separated.

------------------------------------------------------------------------

# 10. Service Layer

The service layer contains reusable business logic.

For example:

``` text
Student Route
     ↓
Student Service
     ↓
Validate/process data
     ↓
Database operation
     ↓
Return result
```

This approach prevents the API routes from becoming unnecessarily large.

------------------------------------------------------------------------

# 11. Supabase Data Layer

Supabase is the persistent data layer for the application.

The conceptual flow is:

``` text
Frontend
   ↓
Flask API
   ↓
Service Layer
   ↓
Supabase Client
   ↓
Supabase Database
```

The database should be treated as the source of truth for persistent
application records.

Examples of records that can be stored include:

``` text
Users
Students
Classes
Subjects
Teachers
Attendance
Timetable entries
Notifications
School configuration
```

The exact schema should be maintained according to the application's
actual Supabase schema.

------------------------------------------------------------------------

# 12. Smart Timetable Architecture

The timetable system is one of the core intelligent features.

A conceptual timetable flow is:

``` text
Administrator
      │
      ▼
Enter / upload timetable information
      │
      ▼
Frontend
      │
      ▼
Backend Timetable API
      │
      ▼
Timetable Generator
      │
      ├── Teachers
      ├── Subjects
      ├── Classes
      ├── Rooms
      ├── Available periods
      ├── Constraints
      └── Other scheduling rules
      │
      ▼
Optimization Engine
      │
      ▼
Generated timetable
      │
      ├── API response
      ├── Persistent storage where applicable
      └── Dashboard display
```

The backend currently uses **OR-Tools CP-SAT** for timetable-related
optimization.

This is important because timetable generation is not simply random
placement. The optimizer can model constraints and search for a
feasible/optimized schedule.

------------------------------------------------------------------------

# 13. Timetable Data Lifecycle

A typical lifecycle is:

### Step 1 --- Input

The administrator supplies scheduling information.

Examples:

``` text
Teachers
Subjects
Classes
Periods
Working days
Teacher availability
Class requirements
Constraints
```

### Step 2 --- Validation

The backend checks whether the input is usable.

### Step 3 --- Transformation

The input is converted into a structure suitable for the optimization
engine.

### Step 4 --- Optimization

OR-Tools searches for a timetable satisfying the configured constraints.

### Step 5 --- Result

The generated timetable is returned to the application.

### Step 6 --- Display

The frontend renders the timetable in the dashboard.

### Step 7 --- Persistence

If the application workflow requires persistent timetable records, they
can be stored in Supabase.

------------------------------------------------------------------------

# 14. Document Reader Architecture

The document reader is a separate FastAPI service.

This separation is intentional.

Instead of putting OCR/document processing directly inside the Flask
application:

``` text
Flask Backend
       │
       │ request
       ▼
Document Reader
       │
       ├── PDF processing
       ├── Image processing
       ├── OCR
       └── AI-assisted extraction
       │
       ▼
Structured result
       │
       ▼
Backend / Frontend
```

This prevents heavy document-processing dependencies from unnecessarily
increasing the size and complexity of the primary backend.

------------------------------------------------------------------------

# 15. Document Processing Lifecycle

A typical document-processing pipeline can be:

``` text
Document
   │
   ▼
Upload
   │
   ▼
Document Reader API
   │
   ▼
Determine file/document type
   │
   ▼
PDF/image processing
   │
   ▼
OCR
   │
   ▼
Extract text
   │
   ▼
AI-assisted interpretation where required
   │
   ▼
Structured information
   │
   ▼
Backend
   │
   ▼
Application workflow
```

The document reader currently includes dependencies such as:

-   PyMuPDF
-   Pillow
-   PaddleOCR
-   PaddlePaddle
-   Ollama

These provide the building blocks for document and AI processing.

------------------------------------------------------------------------

# 16. Frontend ↔ Backend Communication

The frontend communicates with backend APIs rather than directly
implementing server-side business logic.

Conceptually:

``` text
React Component
      ↓
Frontend service
      ↓
Axios
      ↓
Flask API
      ↓
Route
      ↓
Service
      ↓
Supabase / AI service
```

This separation makes it easier to:

-   Change the UI without rewriting backend logic
-   Change backend implementation without rewriting every UI component
-   Test APIs independently
-   Add new clients later
-   Keep security-sensitive logic on the server

------------------------------------------------------------------------

# 17. Frontend State Management

The frontend uses **Zustand** for application state.

State can be used for information that multiple components need to
access, such as:

-   Current user/session-related state
-   Application-level UI state
-   Dashboard state
-   Other shared frontend state

Local component state should remain local when it does not need to be
shared.

------------------------------------------------------------------------

# 18. Notifications

The frontend includes notification functionality, including a
notification bell component.

Conceptually:

``` text
Backend event/data
      ↓
Notification API
      ↓
Frontend service
      ↓
Application state
      ↓
Notification Bell
      ↓
User
```

The exact notification persistence and event-generation strategy should
follow the implemented backend/database schema.

------------------------------------------------------------------------

# 19. Attendance Architecture

Attendance can follow the same layered architecture:

``` text
Attendance UI
     ↓
Frontend API service
     ↓
Backend attendance route
     ↓
Attendance service
     ↓
Supabase
     ↓
Attendance response
     ↓
Dashboard
```

For roster-based attendance, the frontend can request a roster for a
class/date and then submit attendance changes through the backend.

------------------------------------------------------------------------

# 20. Docker Architecture

Docker provides a consistent environment for the application.

The project currently contains:

``` text
backend/Dockerfile
frontend/Dockerfile
ai-services/document-reader/Dockerfile
docker-compose.yml
```

Docker Compose combines these services into one development environment.

------------------------------------------------------------------------

# 21. Docker Compose Services

The current services are:

  -----------------------------------------------------------------------------
  Service             Technology                         Port Purpose
  ------------------- ----------------- --------------------- -----------------
  `backend`           Flask/Python                       5000 Main API/business
                                                              layer

  `document-reader`   FastAPI/Python                     8001 Document/OCR/AI
                                                              processing

  `frontend`          React/Vite/Node                    5173 User interface
  -----------------------------------------------------------------------------

Container names:

``` text
planify-backend
planify-document-reader
planify-frontend
```

------------------------------------------------------------------------

# 22. Backend Dockerfile

The backend image follows this basic process:

``` text
Python base image
      ↓
Set /app
      ↓
Copy requirements
      ↓
Install dependencies
      ↓
Copy application
      ↓
Expose 5000
      ↓
Start Flask
```

The Docker image installs dependencies independently from the host
Python installation.

This is one of the major reasons for using Docker.

------------------------------------------------------------------------

# 23. Frontend Dockerfile

The frontend image follows:

``` text
Node base image
      ↓
Set /app
      ↓
Copy package files
      ↓
npm install
      ↓
Copy source
      ↓
Expose 5173
      ↓
Start Vite
```

The project uses Node 22 Alpine for the development image.

------------------------------------------------------------------------

# 24. Document Reader Dockerfile

The document reader follows:

``` text
Python base image
      ↓
Set /app
      ↓
Copy requirements
      ↓
Install dependencies
      ↓
Copy source
      ↓
Expose 8001
      ↓
Start Uvicorn
```

------------------------------------------------------------------------

# 25. Development Volumes

The Compose configuration mounts source directories into containers.

Backend:

``` yaml
volumes:
  - ./backend:/app
```

Document reader:

``` yaml
volumes:
  - ./ai-services/document-reader:/app
```

Frontend:

``` yaml
volumes:
  - ./frontend:/app
  - /app/node_modules
```

The purpose is to make source-code changes available inside the
development containers.

For frontend, `/app/node_modules` is kept as a container-managed volume
so host `node_modules` does not overwrite the container's Linux
dependencies.

------------------------------------------------------------------------

# 26. `.dockerignore`

The frontend `.dockerignore` currently excludes:

``` text
node_modules/
dist/
.git/
.env
```

This prevents unnecessary or sensitive files from being included in the
Docker build context.

Similar `.dockerignore` files should be maintained for Python services.

------------------------------------------------------------------------

# 27. `.gitignore`

The repository `.gitignore` should prevent generated, local, secret, and
machine-specific files from being committed.

Typical exclusions include:

``` text
node_modules/
dist/
__pycache__/
*.pyc
venv/
.venv/
.env
*.db
*.sqlite
*.sqlite3
uploads/
temp_images/
generated files
IDE files
OS files
logs
```

The purpose is different from `.dockerignore`:

### `.gitignore`

Controls what Git tracks.

### `.dockerignore`

Controls what Docker sends to the build context.

A file can be ignored by one and not the other.

------------------------------------------------------------------------

# 28. Environment Variables

Sensitive configuration should be kept in `.env` files.

Examples include:

``` text
Supabase URL
Supabase key
API configuration
AI service configuration
Ollama configuration
```

Do not commit real secrets to Git.

A new developer should create their local `.env` files from the required
configuration/documentation rather than receiving secrets through source
control.

------------------------------------------------------------------------

# 29. Requirements

## Hardware

A reasonable development machine should have:

-   64-bit CPU
-   Virtualization support
-   At least 8 GB RAM
-   Recommended: 16 GB RAM
-   Sufficient disk space for Docker images and AI dependencies
-   Internet connection for downloading dependencies/images

AI/document-processing dependencies can consume considerably more disk
space and memory than a simple web application.

------------------------------------------------------------------------

# 30. Windows Development Requirements

For Windows development:

1.  Windows 10/11 with virtualization support
2.  Docker Desktop
3.  WSL 2
4.  A Linux distribution such as Ubuntu
5.  Git
6.  PowerShell or Git Bash

Docker Desktop should be configured to use the WSL 2 backend.

------------------------------------------------------------------------

# 31. Linux/macOS Development

On Linux/macOS, install:

-   Docker Engine or Docker Desktop
-   Docker Compose
-   Git

The exact installation method depends on the operating system.

------------------------------------------------------------------------

# 32. Installation --- New Machine

Clone the repository:

``` bash
git clone <repository-url>
cd ai-timetable_generator
```

Do not put real credentials in Git.

Create the required environment files:

``` text
backend/.env
frontend/.env
ai-services/document-reader/.env
```

Use the project's required environment variable names.

------------------------------------------------------------------------

# 33. Verify Docker

Run:

``` bash
docker --version
```

Then:

``` bash
docker compose version
```

Finally:

``` bash
docker info
```

Docker should return both client and server information.

------------------------------------------------------------------------

# 34. Build the Project

From the project root:

``` bash
docker compose build
```

This builds all configured services.

To rebuild after dependency/Dockerfile changes:

``` bash
docker compose build --no-cache
```

Use `--no-cache` only when necessary because it makes the build slower.

------------------------------------------------------------------------

# 35. Start Everything

The normal development command is:

``` bash
docker compose up
```

Or, after Dockerfile/dependency changes:

``` bash
docker compose up --build
```

This starts:

``` text
Frontend          → http://localhost:5173
Backend           → http://localhost:5000
Document Reader   → http://localhost:8001
```

------------------------------------------------------------------------

# 36. Start in Background

If you don't want the terminal attached to the containers:

``` bash
docker compose up -d
```

Then check:

``` bash
docker compose ps
```

View logs:

``` bash
docker compose logs
```

Or for one service:

``` bash
docker compose logs backend
```

``` bash
docker compose logs frontend
```

``` bash
docker compose logs document-reader
```

------------------------------------------------------------------------

# 37. Stop Everything

``` bash
docker compose down
```

This stops and removes the Compose containers and network.

It does not remove your source code.

------------------------------------------------------------------------

# 38. Restart Everything

``` bash
docker compose restart
```

Or:

``` bash
docker compose down
docker compose up
```

------------------------------------------------------------------------

# 39. Rebuild One Service

Backend:

``` bash
docker compose build backend
docker compose up backend
```

Frontend:

``` bash
docker compose build frontend
docker compose up frontend
```

Document reader:

``` bash
docker compose build document-reader
docker compose up document-reader
```

------------------------------------------------------------------------

# 40. Development Workflow

The intended workflow is:

``` text
1. Start Docker Desktop
        ↓
2. Open project
        ↓
3. Run docker compose up
        ↓
4. Open localhost:5173
        ↓
5. Develop normally
        ↓
6. Save code
        ↓
7. Containers receive mounted source changes
```

For dependency changes, rebuild the relevant service.

For example, if `backend/requirements.txt` changes:

``` bash
docker compose build backend
docker compose up backend
```

If `frontend/package.json` changes:

``` bash
docker compose build frontend
docker compose up frontend
```

------------------------------------------------------------------------

# 41. Dependency Management

Dependencies are declared in project files rather than relying on
whatever happens to be installed on the developer's machine.

Backend:

``` text
backend/requirements.txt
```

Document reader:

``` text
ai-services/document-reader/requirements.txt
```

Frontend:

``` text
frontend/package.json
frontend/package-lock.json
```

Docker installs these dependencies during image creation.

This means a new developer does not need to manually reproduce the exact
host environment.

------------------------------------------------------------------------

# 42. Why Docker?

Without Docker, development may look like:

``` text
Terminal 1 → Flask
Terminal 2 → FastAPI
Terminal 3 → Vite
```

and each machine needs compatible versions of:

``` text
Python
Node
npm
Python packages
Node packages
AI libraries
system libraries
```

Docker changes the model to:

``` text
Docker Desktop
      ↓
docker compose up
      ↓
All services
```

Advantages:

-   Consistent environments
-   Easier onboarding
-   Dependency isolation
-   Service isolation
-   Reproducible builds
-   Easier deployment
-   Less host-machine configuration
-   Easier scaling to additional services
-   Clear service boundaries

------------------------------------------------------------------------

# 43. Why Microservices/Separate AI Services?

Document processing and AI workloads can have heavy dependencies.

Keeping them separate means:

``` text
Main Backend
      │
      ├── normal ERP APIs
      │
      └── AI/document service
```

Benefits:

-   Independent dependencies
-   Independent deployment
-   Easier debugging
-   Easier scaling
-   Failure isolation
-   Smaller responsibility per service
-   Easier future replacement of an AI engine

For example, the document reader can be changed without rewriting the
entire ERP backend.

------------------------------------------------------------------------

# 44. Complete Request Example --- Student Dashboard

A simplified request lifecycle:

``` text
1. User opens browser
        ↓
2. React application loads
        ↓
3. User authenticates
        ↓
4. Frontend obtains authenticated state
        ↓
5. Dashboard requests student/application data
        ↓
6. Axios sends HTTP request
        ↓
7. Flask receives request
        ↓
8. Flask route validates request
        ↓
9. Service layer executes business logic
        ↓
10. Supabase is queried
        ↓
11. Backend receives database result
        ↓
12. Backend returns JSON
        ↓
13. Frontend updates Zustand/component state
        ↓
14. Dashboard renders data
```

------------------------------------------------------------------------

# 45. Complete Request Example --- Smart Timetable

``` text
Administrator
     ↓
Dashboard
     ↓
Timetable module
     ↓
Input scheduling data
     ↓
Frontend API request
     ↓
Flask timetable route
     ↓
Timetable service / optimizer
     ↓
OR-Tools CP-SAT
     ↓
Constraint evaluation
     ↓
Feasible/optimized timetable
     ↓
Backend
     ↓
Persist if required
     ↓
JSON response
     ↓
React timetable UI
     ↓
Administrator
```

------------------------------------------------------------------------

# 46. Complete Request Example --- Document Processing

``` text
Administrator
      ↓
Upload document
      ↓
Frontend
      ↓
Document Reader API
      ↓
FastAPI
      ↓
PDF/image processing
      ↓
OCR
      ↓
Text extraction
      ↓
AI-assisted interpretation if required
      ↓
Structured output
      ↓
Backend/application workflow
      ↓
Supabase if persistence is required
      ↓
Dashboard
```

------------------------------------------------------------------------

# 47. Service Communication

At the browser level:

``` text
Browser
  │
  ├── localhost:5173 → Frontend
  ├── localhost:5000 → Backend API
  └── localhost:8001 → Document Reader API
```

Inside Docker Compose, services can communicate through the Compose
network using service names.

For example:

``` text
backend
document-reader
frontend
```

The service name is generally preferred for container-to-container
communication rather than hard-coding container IP addresses.

Container IP addresses can change.

------------------------------------------------------------------------

# 48. Health and Debugging

Check running services:

``` bash
docker compose ps
```

Check all logs:

``` bash
docker compose logs
```

Follow logs:

``` bash
docker compose logs -f
```

Follow backend logs:

``` bash
docker compose logs -f backend
```

Follow frontend logs:

``` bash
docker compose logs -f frontend
```

Follow document-reader logs:

``` bash
docker compose logs -f document-reader
```

------------------------------------------------------------------------

# 49. Common Docker Problems

## Docker command not found

Install Docker Desktop and ensure the Docker CLI is available in PATH.

Verify:

``` bash
docker --version
```

------------------------------------------------------------------------

## WSL 2 not available

On Windows, Docker Desktop generally requires the necessary
virtualization/WSL configuration.

Check:

``` powershell
wsl --status
```

and:

``` powershell
wsl -l -v
```

A WSL 2 distribution should show version `2`.

------------------------------------------------------------------------

## Container exits immediately

Check:

``` bash
docker compose logs <service>
```

The logs normally identify missing dependencies, environment variables,
import errors, or application startup errors.

------------------------------------------------------------------------

## Missing Python dependency

If the container reports:

``` text
ModuleNotFoundError
```

add the package to the appropriate `requirements.txt`, then rebuild:

``` bash
docker compose build backend
```

or the appropriate service.

------------------------------------------------------------------------

## Missing Node dependency

If the frontend reports a missing npm package:

1.  Add/install the dependency in the frontend project.
2.  Update `package.json`.
3.  Rebuild:

``` bash
docker compose build frontend
```

------------------------------------------------------------------------

# 50. Important Difference: Git Ignore vs Docker Ignore

### `.gitignore`

Controls Git.

``` text
Developer machine
       ↓
Git
       ↓
.gitignore
       ↓
What gets committed
```

### `.dockerignore`

Controls Docker build context.

``` text
Project directory
       ↓
Docker build
       ↓
.dockerignore
       ↓
What is sent to Docker
```

They solve different problems.

------------------------------------------------------------------------

# 51. Security Principles

Never commit:

``` text
.env
API keys
Supabase secrets
private tokens
passwords
service credentials
```

Use environment variables.

Also:

-   Do not expose database service credentials to the browser.
-   Validate API inputs.
-   Authenticate protected routes.
-   Authorize users according to their role.
-   Do not trust client-side permissions.
-   Keep production secrets outside the source repository.
-   Use HTTPS in production.
-   Replace Flask's development server with a production WSGI server for
    deployment.

------------------------------------------------------------------------

# 52. Development vs Production

The current Docker setup is a **development-oriented setup**.

For example, the backend currently starts Flask in development mode and
the frontend starts Vite's development server.

Production should use a different configuration.

Typical production architecture:

``` text
                    Internet
                       │
                       ▼
                 Reverse Proxy
                       │
              ┌────────┴────────┐
              ▼                 ▼
        Frontend/static      API Gateway
                                  │
                    ┌─────────────┼──────────────┐
                    ▼             ▼              ▼
                 Backend      AI Service      Other Services
                    │             │
                    └─────────────┴──────────────┘
                                  │
                                  ▼
                               Supabase
```

Production should also include proper logging, monitoring, security
configuration, secrets management, backups, and resource limits.

------------------------------------------------------------------------

# 53. Scalability

The architecture can grow without turning the entire project into one
codebase.

For example, additional services can be introduced:

``` text
ai-services/
├── document-reader/
├── timetable-generator/
├── routine-generator/
├── notification-service/
└── analytics-service/
```

Each service can have its own:

``` text
Dockerfile
requirements
API
environment variables
deployment lifecycle
```

The backend can coordinate these services where appropriate.

------------------------------------------------------------------------

# 54. Advantages of the Architecture

## Separation of concerns

Each layer has a defined responsibility:

``` text
Frontend       → Presentation
Backend        → API + Business Logic
AI Services    → AI/Processing
Supabase       → Persistent Data
Docker         → Environment/Runtime
```

------------------------------------------------------------------------

## Easier maintenance

A developer can work on the frontend without changing the AI service.

A backend developer can modify APIs without rewriting OCR code.

------------------------------------------------------------------------

## Easier onboarding

A new developer can install Docker and run:

``` bash
docker compose up
```

instead of manually configuring every service.

------------------------------------------------------------------------

## Dependency isolation

Python dependencies stay inside Python containers.

Node dependencies stay inside the frontend container.

Heavy AI libraries remain isolated in their service.

------------------------------------------------------------------------

## Future scalability

Services can eventually be deployed independently.

For example:

``` text
Backend × 2
Document Reader × 3
Frontend × N
```

depending on production requirements.

------------------------------------------------------------------------

# 55. Data Ownership Model

A useful architectural rule is:

``` text
Frontend
    ↓
does not own persistent truth

Backend
    ↓
owns business/API rules

Supabase
    ↓
owns persistent application data

AI services
    ↓
process data and return results
```

This prevents multiple parts of the system from independently becoming
the source of truth.

------------------------------------------------------------------------

# 56. Recommended Data Flow Principle

When adding a new feature, prefer:

``` text
UI
 ↓
Frontend service
 ↓
Backend route
 ↓
Backend service
 ↓
Database / AI service
 ↓
Backend response
 ↓
Frontend
```

Avoid putting database logic directly inside React components.

Avoid putting all business logic directly inside Flask route functions.

Avoid tightly coupling AI implementation to the frontend.

------------------------------------------------------------------------

# 57. Adding a New Backend Feature

Recommended process:

### 1. Create route

``` text
backend/routes/<feature>.py
```

### 2. Create service logic

``` text
backend/services/<feature>_services.py
```

### 3. Register blueprint

In:

``` text
backend/app.py
```

### 4. Connect database/AI logic

Use the appropriate service/data layer.

### 5. Create frontend API service

For example:

``` text
frontend/src/services/<feature>.service.js
```

### 6. Connect the UI

Create/update the relevant React components/pages.

------------------------------------------------------------------------

# 58. Adding a New AI Service

Recommended structure:

``` text
ai-services/
└── new-service/
    ├── Dockerfile
    ├── requirements.txt
    ├── .env
    ├── app.py
    └── ...
```

Then add the service to:

``` text
docker-compose.yml
```

Define:

-   Build context
-   Container name
-   Port
-   Environment file
-   Volumes if needed
-   Restart policy
-   Dependencies if needed

------------------------------------------------------------------------

# 59. Git Workflow

Before committing:

``` bash
git status
```

Review changes.

Then:

``` bash
git add .
```

Commit:

``` bash
git commit -m "Describe the change"
```

Push:

``` bash
git push
```

Do not commit:

``` text
.env
node_modules
__pycache__
local databases
temporary uploads
generated files
```

unless a particular generated/data artifact is intentionally part of the
project.

------------------------------------------------------------------------

# 60. Typical Daily Workflow

Start the computer.

Start Docker Desktop.

Open the repository.

Run:

``` bash
docker compose up
```

Open:

``` text
http://localhost:5173
```

Develop.

When finished:

``` text
Ctrl + C
```

or, if running detached:

``` bash
docker compose down
```

------------------------------------------------------------------------

# 61. Quick Command Reference

  Task               Command
  ------------------ ------------------------------------------
  Build everything   `docker compose build`
  Build and start    `docker compose up --build`
  Start              `docker compose up`
  Start detached     `docker compose up -d`
  Stop               `docker compose down`
  Restart            `docker compose restart`
  Status             `docker compose ps`
  All logs           `docker compose logs`
  Follow logs        `docker compose logs -f`
  Backend logs       `docker compose logs -f backend`
  Frontend logs      `docker compose logs -f frontend`
  Reader logs        `docker compose logs -f document-reader`
  Validate Compose   `docker compose config`
  Rebuild backend    `docker compose build backend`
  Rebuild frontend   `docker compose build frontend`
  Rebuild reader     `docker compose build document-reader`

------------------------------------------------------------------------

# 62. Local URLs

After starting the development environment:

### Frontend

``` text
http://localhost:5173
```

### Backend

``` text
http://localhost:5000
```

### Document Reader

``` text
http://localhost:8001
```

------------------------------------------------------------------------

# 63. Final Architecture Summary

The complete system can be understood as:

``` text
                         ┌─────────────────────┐
                         │       USERS         │
                         │ Admin / Student etc.│
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  React Frontend     │
                         │      :5173          │
                         └──────────┬──────────┘
                                    │
                             REST / HTTP
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Flask Backend     │
                         │      :5000          │
                         │                     │
                         │ Routes              │
                         │ Services            │
                         │ Auth                │
                         │ Student             │
                         │ Attendance           │
                         │ Timetable           │
                         └──────┬───────┬──────┘
                                │       │
                         Data   │       │ AI/Documents
                                │       │
                                ▼       ▼
                     ┌──────────────┐  ┌──────────────────┐
                     │   Supabase   │  │ Document Reader  │
                     │              │  │   FastAPI :8001  │
                     │ Persistent   │  │                  │
                     │ Application  │  │ OCR              │
                     │ Data         │  │ PDF/Image        │
                     └──────────────┘  │ AI Processing     │
                                       └──────────────────┘

                              Docker Compose
                                     │
                     ┌───────────────┼───────────────┐
                     ▼               ▼               ▼
                  Frontend        Backend       AI Services
```

------------------------------------------------------------------------

# 64. The Big Picture

The most important concept is that **Planify AI is not one giant
application**.

It is a coordinated system:

``` text
React
  ↓
User Interface

Flask
  ↓
Business/API Layer

FastAPI AI Services
  ↓
Specialized Processing

Supabase
  ↓
Persistent Data

Docker
  ↓
Runs everything consistently
```

The administrator interacts with the frontend.

The frontend communicates with the backend.

The backend validates requests, applies business logic, accesses
Supabase, and coordinates specialized services.

When document intelligence is required, the document-reader service
processes the document and returns structured information.

When timetable generation is required, the backend uses the
timetable/optimization logic and OR-Tools to generate a schedule
according to the configured constraints.

The resulting information is returned to the frontend and presented
through the dashboard.

This architecture gives the project a clear separation between
**presentation, business logic, specialized AI processing, persistent
storage, and infrastructure**.

------------------------------------------------------------------------

# 65. Current Development Start Command

Once Docker Desktop is running, the intended development command is:

``` bash
docker compose up
```

For a clean rebuild after changing Dockerfiles or dependencies:

``` bash
docker compose up --build
```

Then open:

``` text
http://localhost:5173
```

That is the primary entry point for the Planify AI application.
