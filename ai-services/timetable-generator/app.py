from fastapi import FastAPI

app = FastAPI(
    title="AI Timetable Generator",
    version="1.0.0",
)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "AI Timetable Generator is running 🚀",
    }