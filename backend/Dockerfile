FROM python:3.12-slim

WORKDIR /app

# Copy dependency requirements first to leverage Docker layer caching
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application code
COPY . .

EXPOSE 8000

# Start uvicorn. If $PORT is provided by Render, use it; otherwise default to 8000.
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]