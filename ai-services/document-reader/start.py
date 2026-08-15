import subprocess
import sys
import time


print("🚀 Starting Document Reader API...")

api = subprocess.Popen([
    sys.executable,
    "-m",
    "uvicorn",
    "app:app",
    "--host",
    "0.0.0.0",
    "--port",
    "8001",
])

print("🚀 Starting OCR/AI Worker...")

worker = subprocess.Popen([
    sys.executable,
    "-m",
    "workers.processor",
])

try:
    while True:
        if api.poll() is not None:
            print("❌ FastAPI process stopped.")
            worker.terminate()
            sys.exit(1)

        if worker.poll() is not None:
            print("❌ OCR worker stopped.")
            api.terminate()
            sys.exit(1)

        time.sleep(2)

except KeyboardInterrupt:
    api.terminate()
    worker.terminate()