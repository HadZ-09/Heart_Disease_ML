from fastapi import FastAPI
from pydantic import BaseModel,Field,EmailStr
from predictor import predict
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI(title="heart disease prediction")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your Vite dev server
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/lol")

def lol():
    return{
        "message": "hello there"
    }

class HeartDiseaseInputSchema(BaseModel):
    age: Annotated[int,Field(default=69 )]
    sex: Annotated[int,Field(description="Type 1 for male 0 for female",default=0)]
    cp: int
    trestbps: float
    chol:float
    fbs:int
    restecg:int
    thalach:float
    exang:int
    oldpeak:float
    slope:int
    ca:int
    thal:int
    
@app.get("/health")
def health_check():
    return({
        "status": "ok"
    })

@app.post("/predict_heart_disease")
def predict_heart_disease(input_data: HeartDiseaseInputSchema):
    data_dict=input_data.model_dump()
    res=predict(data_dict)
    return(
        {
            "prediction": res["prediction"],
            "probability": round(res["probability"],4)*100,
            "diagonosis": (
             "Heart Disease Detected"
            if res["prediction"]==1
               
            else   "Heart Disease Not Detected"
            )
        }
        
    )

