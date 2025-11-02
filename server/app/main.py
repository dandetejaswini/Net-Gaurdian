from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import classify, deepfake, reports, openai_summary, admin
from app.db import Base, engine

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="NetGuardian API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(classify.router)
app.include_router(deepfake.router)
app.include_router(reports.router)
app.include_router(openai_summary.router)
app.include_router(admin.router)
