from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes import scenes, uploads

app = FastAPI(title="Scene Stealer API")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(uploads.router, prefix="/api", tags=["uploads"])
app.include_router(scenes.router, prefix="/api", tags=["scenes"])

@app.get("/")
async def root():
    return {"message": "Scene Stealer API is running"}