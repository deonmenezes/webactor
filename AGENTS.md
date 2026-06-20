# Webactor (Scene Stealer / Actify)

A full-stack acting/performance tool that analyses audio and video scenes using machine learning, providing feedback for actors. Backend is branded "Actify API".

## Tech Stack

- **Backend**: Python, FastAPI, Uvicorn, TensorFlow (CPU), OpenCV, librosa, pydub, python-jose (JWT)
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Radix UI / shadcn/ui
- **Containerisation**: Docker (backend)
- **Package Manager**: pnpm (frontend), pip (backend)

## Setup

```bash
# Backend (native)
cd backend
pip install -r requirements.txt

# Backend (Docker)
cd backend
docker build -t actify-api .
docker run -p 8000:8000 actify-api

# Frontend
cd scene-stealer
pnpm install
```

## Build / Run / Test

```bash
# Backend — development
cd backend
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

# Frontend — development
cd scene-stealer
pnpm dev

# Frontend — production build
pnpm build

# Frontend — start production server
pnpm start

# Frontend — lint
pnpm lint
```

## Project Structure

```
backend/
  src/
    main.py             # FastAPI app; registers /api/uploads and /api/scenes routers
    api/
      routes/
        uploads.py      # File upload endpoints
        scenes.py       # Scene analysis endpoints
    core/               # Config, settings, auth utilities
    db/                 # Database models/connections
    schemas/            # Pydantic request/response schemas
    services/           # ML inference and business logic
  requirements.txt      # Python dependencies
  Dockerfile            # Docker build for backend
  static/uploads/       # Uploaded media files (auto-created)
scene-stealer/          # Next.js frontend
  app/                  # App Router pages
  components/           # Reusable UI components
  hooks/                # Custom React hooks
  lib/                  # Utility functions
  public/               # Static assets
```

## Architecture & Key Files

- `backend/src/main.py` — FastAPI entry point; mounts routers for uploads and scene analysis
- `backend/src/api/routes/scenes.py` — core scene analysis route; calls ML services
- `backend/src/services/` — TensorFlow/librosa-based inference logic
- `scene-stealer/app/` — Next.js App Router pages; calls FastAPI backend
- `backend/Dockerfile` — production container; installs ffmpeg + libsndfile system deps

## Conventions & Notes for Agents

- TensorFlow CPU build is pinned (`tensorflow-cpu==2.16.1`); do not swap to the GPU build without adjusting `requirements.txt` and the Dockerfile.
- `ffmpeg` and `libsndfile1` are required system dependencies for audio processing (installed in Docker, must be present locally too).
- CORS is wide-open (`allow_origins=["*"]`) — restrict before production deployment.
- Uploaded files land in `backend/static/uploads/`; this directory is created by the Dockerfile but must be created manually for local dev.
- The frontend (`scene-stealer`) uses the App Router; all pages live under `scene-stealer/app/`.
- Use pnpm for frontend package management; a `pnpm-lock.yaml` is the source of truth.
