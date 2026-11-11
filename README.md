# Crop Recommendation

A machine learning web application that predicts the best crop to cultivate based on soil nutrients and climatic parameters.

## The API contract
Feature names and order, exactly (case sensitive): `N, P, K, temperature, humidity, ph, rainfall`.

### Request POST /predict
```json
{"N": 90, "P": 42, "K": 43, "temperature": 20.8, "humidity": 82.0, "ph": 6.5, "rainfall": 202.9}
```

### Response 200
```json
{
  "crop": "rice",
  "confidence": 0.97,
  "top3": [
    {"crop": "rice", "probability": 0.97},
    {"crop": "jute", "probability": 0.02},
    {"crop": "coffee", "probability": 0.01}
  ]
}
```

### Invalid Input
Any value outside allowed boundaries (e.g., `ph = 20`) returns status **422 Unprocessable Entity**.