import joblib
import pandas as pd
model=joblib.load("backend/crop_model.pkl")
input_data=pd.DataFrame([[90,42,43,20.8,82.0,6.5,202.9]],
                        columns=[
                            "N","P","K","temperature",
                            "humidity","ph","rainfall"
                        ])

prediction=model.predict(input_data)
print("Predicted Crop:",prediction[0])