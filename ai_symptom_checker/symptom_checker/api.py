from fastapi import FastAPI
from symptom_checker.schemas import SymptomInput, DiseaseOutput
from symptom_checker.predictor import SymptomPredictor

app = FastAPI(title="Symptom Checker API")

@app.post("/predict", response_model=DiseaseOutput)
def get_prediction(data: SymptomInput):
    predictor = SymptomPredictor()
    result = predictor.predict_disease(data.symptoms)
    return DiseaseOutput(disease=result)


# Run the API:
# Step 1: Train the model
# python symptom_checker/training.py

# Step 2: Start the FastAPI server
# uvicorn symptom_checker.api:app --reload