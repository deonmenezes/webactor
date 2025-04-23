class ScoreCalculator:
    def calculate_total_score(self, voice_score: float, facial_score: float) -> float:
        # Weighted average: 40% voice, 60% facial expressions
        return round((voice_score * 0.4) + (facial_score * 0.6), 1)
    
    def get_voice_feedback(self, score: float) -> str:
        if score >= 90:
            return "Outstanding vocal performance! Perfect emotional delivery"
        elif score >= 80:
            return "Great vocal emotion match with the scene"
        elif score >= 70:
            return "Good pitch and tone, keep practicing the emotional delivery"
        elif score >= 60:
            return "Decent effort, try to express more emotion in your voice"
        else:
            return "Focus on matching the emotional tone of the scene with your voice"
    
    def get_facial_feedback(self, score: float) -> str:
        if score >= 90:
            return "Perfect facial expressions! You nailed the scene's emotions"
        elif score >= 80:
            return "Excellent facial acting, very expressive"
        elif score >= 70:
            return "Good facial expressions, keep working on emotional range"
        elif score >= 60:
            return "Need more dramatic expressions to match the scene"
        else:
            return "Try to convey more emotion through your facial expressions"