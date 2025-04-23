import os
import numpy as np
import tensorflow as tf
import librosa
import cv2
from pydub import AudioSegment

class EmotionAnalyzer:
    def __init__(self):
        self.voice_model = tf.keras.models.load_model("ml/voice_emotion_model.h5")
        self.facial_interpreter = tf.lite.Interpreter(model_path="ml/facial_emotion_quantized.tflite")
        self.facial_interpreter.allocate_tensors()

    def analyze_voice(self, video_path):
        try:
            # Extract audio from video
            audio = AudioSegment.from_file(video_path)
            audio_path = video_path.rsplit(".", 1)[0] + ".wav"
            audio.export(audio_path, format="wav")
            
            # Load and preprocess audio
            y, sr = librosa.load(audio_path)
            mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
            mfcc_scaled = np.mean(mfcc.T, axis=0)
            
            # Get prediction
            prediction = self.voice_model.predict(np.expand_dims(mfcc_scaled, axis=0))
            score = float(np.max(prediction) * 100)
            
            # Cleanup
            os.remove(audio_path)
            
            return score
        except Exception as e:
            print(f"Error in voice analysis: {str(e)}")
            return 0.0

    def analyze_facial(self, video_path):
        try:
            cap = cv2.VideoCapture(video_path)
            frame_scores = []
            
            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break
                
                # Preprocess frame
                frame = cv2.resize(frame, (48, 48))
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                frame = np.expand_dims(frame, axis=-1) / 255.0
                
                # Get prediction
                input_details = self.facial_interpreter.get_input_details()
                output_details = self.facial_interpreter.get_output_details()
                
                self.facial_interpreter.set_tensor(
                    input_details[0]['index'],
                    np.expand_dims(frame, axis=0).astype(np.float32)
                )
                self.facial_interpreter.invoke()
                prediction = self.facial_interpreter.get_tensor(output_details[0]['index'])
                
                frame_scores.append(float(np.max(prediction) * 100))
            
            cap.release()
            return np.mean(frame_scores) if frame_scores else 0.0
        except Exception as e:
            print(f"Error in facial analysis: {str(e)}")
            return 0.0