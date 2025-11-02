from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/deepfake", tags=["Deepfake"])

@router.post("/check")
def check_deepfake(file: UploadFile = File(...)):
    # Dummy: always safe
    return {"filename": file.filename, "deepfake": False}
