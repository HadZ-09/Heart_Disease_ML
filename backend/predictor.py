import pandas as pd
from joblib import load
import os 
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()
PROJECT_ROOT=Path(os.getenv("PROJECT_ROOT")).resolve()
DATSET_PATH=PROJECT_ROOT/ os.getenv("DATASET_DIR")/ os.getenv("DATASET")
MODEL_PATH=PROJECT_ROOT/ os.getenv("MODEL_DIR")/ os.getenv("MODEL_NAME")



    
model=load(MODEL_PATH)

def predict(input :dict):
    df=pd.DataFrame([input])
    prediction=int(model.predict(df)[0])
    probability=float(model.predict_proba(df)[0][1])

    return{
        "prediction": prediction,
        "probability": probability
    }

# sample_input = {
#     "age": 52,
#     "sex": 1,
#     "cp": 0,
#     "trestbps": 125,
#     "chol": 212,
#     "fbs": 0,
#     "restecg": 1,
#     "thalach": 168,
#     "exang": 0,
#     "oldpeak": 1.0,
#     "slope": 2,
#     "ca": 0,
#     "thal": 2
# }
# result = predict(input=sample_input)
# print(result)