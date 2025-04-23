from fastapi import APIRouter, UploadFile, HTTPException
from services.emotion_analyzer import EmotionAnalyzer
from services.score_calculator import ScoreCalculator

router = APIRouter()

@router.post("/evaluate-scene")
async def evaluate_scene(video: UploadFile, scene_id: str):
    try:
        # Save uploaded video
        video_path = f"static/uploads/{video.filename}"
        with open(video_path, "wb") as buffer:
            content = await video.read()
            buffer.write(content)
            
        # Process video and calculate scores
        emotion_analyzer = EmotionAnalyzer()
        score_calculator = ScoreCalculator()
        
        voice_score = emotion_analyzer.analyze_voice(video_path)
        facial_score = emotion_analyzer.analyze_facial(video_path)
        total_score = score_calculator.calculate_total_score(voice_score, facial_score)
        
        return {
            "voice_emotion_score": voice_score,
            "facial_emotion_score": facial_score,
            "total_score": total_score,
            "feedback": {
                "voice": score_calculator.get_voice_feedback(voice_score),
                "face": score_calculator.get_facial_feedback(facial_score)
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))