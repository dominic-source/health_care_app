import joblib
from pathlib import Path
import numpy as np
from typing import Dict, List, Tuple

class SymptomPredictor:
    def __init__(self, model_path: str = "model/symptom_model.pkl"):
        self.model_path = Path(model_path)
        self.model = self._load_model()

    def _load_model(self):
        if not self.model_path.exists():
            raise FileNotFoundError(f"Model file not found at {self.model_path}")
        return joblib.load(self.model_path)
    
    def predict_disease(self, symptoms: str) -> str:
        """
        Predict the disease based on the provided symptoms.
        
        :param symptoms: A string containing the symptoms.
        :return: The predicted disease as a string.
        """
        prediction = self.model.predict([symptoms])[0]
        return prediction

    def predict_with_confidence(self, symptoms: str) -> Dict[str, float]:
        """
        Predict the disease and provide confidence score.
        
        :param symptoms: A string containing the symptoms.
        :return: A dictionary containing the predicted disease and its confidence score.
        """
        probabilities = self.model.predict_proba([symptoms])[0]
        classes = self.model.classes_

        top_indices = np.argsort(probabilities)[-3:][::-1]

        results = {
            "Primary_prediction": classes[top_indices[0]],
            "Confidence_score": float(probabilities[top_indices[0]]),
            "top_predictions": [
                {
                    "disease": classes[i],
                    "confidence": float(probabilities[i])
                }
                for i in top_indices
            ]
        }
        return results

if __name__ == "__main__":
    predictor = SymptomPredictor()
    sample_symptoms = "vomiting"
    prediction = predictor.predict_disease(sample_symptoms)
    print(f"Predicted disease: {prediction}")
    
    confidence_result = predictor.predict_with_confidence(sample_symptoms)
    print(f"Prediction with confidence: {confidence_result}")
