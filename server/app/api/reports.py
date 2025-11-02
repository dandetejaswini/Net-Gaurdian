from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.activity import Activity

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/")
def get_reports(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    activities = db.query(Activity).offset(skip).limit(limit).all()
    return activities
