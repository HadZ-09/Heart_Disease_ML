from joblib import dump
from dotenv import load_dotenv
import numpy as np
import pandas as pd

from sklearn.model_selection import   GroupShuffleSplit 
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline 
from sklearn.ensemble import RandomForestClassifier 

from sklearn.preprocessing import StandardScaler
from pathlib import Path
from sklearn.metrics import ( accuracy_score, classification_report,recall_score,precision_score,f1_score )
import os

def prediction():
    try:
        load_dotenv()
        RANDOM_STATE=int(os.getenv("RANDOM_STATE"))
        TEST_SIZE=float(os.getenv("TEST_SIZE"))
        TARGETCOL=os.getenv("TARGETCOL")
        PROJECT_ROOT=Path(os.getenv("PROJECT_ROOT")).resolve()
        DATASET_PATH=PROJECT_ROOT/ os.getenv("DATASET_DIR")/ os.getenv("DATASET")
        MODEL_PATH=PROJECT_ROOT/ os.getenv("MODEL_DIR")/ os.getenv("MODEL_NAME")
        MODEL_PATH.parent.mkdir(parents=True,exist_ok=True)
        df=pd.read_csv(DATASET_PATH)

        X=df.drop(columns=TARGETCOL)
        y=df[TARGETCOL]
        row_dup=pd.util.hash_pandas_object(X,index=False)
       
        gss=GroupShuffleSplit(  
            n_splits=1,
            random_state=RANDOM_STATE,
            test_size=TEST_SIZE
        )
        train_idx,test_idx=next(
                    gss.split(X,y,groups=row_dup)
                )
        X_train,X_test=X.iloc[train_idx],X.iloc[test_idx]
        y_train,y_test=y.iloc[train_idx],y.iloc[test_idx]


        model=Pipeline(
            [
                ("imputer", SimpleImputer(strategy="median")),
                ("scale", StandardScaler()),
                ("model", RandomForestClassifier(random_state=RANDOM_STATE,
                    bootstrap=True,
                                ccp_alpha=np.float64(0.00176985004103839),
                                max_depth=5,
                                max_features='sqrt',
                                max_samples=np.float64(0.6158295511186883),
                                min_samples_leaf=11,
                                min_samples_split=30,
                                n_estimators=1119
                    )
                )
            ]
        )

        model.fit(X_train,y_train)

        y_pred_train=model.predict(X_train)
        y_pred_test=model.predict(X_test)

        print("classification report", classification_report(y_train,y_pred_train))
        print("*"*100)
        print("classification report", classification_report(y_test,y_pred_test))
        #Saving Model
        # MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
        dump(model,MODEL_PATH)
       
    
    except Exception as e:
        return(
            {"exception": e}
        )
if __name__=="__main__":
    prediction()