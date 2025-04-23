from fastapi import APIRouter, UploadFile, HTTPException
from pathlib import Path
import aiofiles

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile):
    try:
        upload_dir = Path("static/uploads")
        upload_dir.mkdir(parents=True, exist_ok=True)
        
        file_path = upload_dir / file.filename
        async with aiofiles.open(file_path, 'wb') as out_file:
            content = await file.read()
            await out_file.write(content)
            
        return {"filename": file.filename, "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))