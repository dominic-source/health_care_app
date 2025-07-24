from pydantic import BaseModel

class SymptomInput(BaseModel):
    symptoms: str

class DiseaseOutput(BaseModel):
    disease: str