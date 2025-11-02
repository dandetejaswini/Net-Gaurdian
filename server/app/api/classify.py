from fastapi import APIRouter

router = APIRouter(prefix="/classify", tags=["Classify"])

@router.post("/")
def classify_text(text: str):
    # Dummy implementation
    label = "safe" if "bad" not in text.lower() else "unsafe"
    return {"text": text, "label": label}
