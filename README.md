# Crop Recommendation

A user types 7 soil and weather values on a web page. The page sends them to a FastAPI server, which runs a saved Random Forest model and returns the best crop and the top 3 choices.

## How it works

```
OFFLINE (once): CSV -> train_model.py -> crop_model.pkl
ONLINE (each click): page + script.js --request--> main.py (loads the pkl) --response--> page
```

## Folder structure

```
data/Crop_recommendation.csv   the dataset
notebooks/                     one notebook per ML member
train_model.py                 trains, compares, tunes and saves the model
main.py                        the FastAPI server
frontend/                      index.html, style.css, script.js
requirements.txt               libraries the app needs
```

## Install

Run these in the project folder (Windows):

```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## Train the model

```
python train_model.py
```

It prints the accuracy of every model, the evaluation, the best settings and the feature importances. The last line is `Saved crop_model.pkl`. The pkl file is not in Git, so everyone runs this once on their own computer.

## Run the app

```
python -m uvicorn main:app --reload
```

Open http://127.0.0.1:8000/ for the page and http://127.0.0.1:8000/docs to test the API.

## API

Request: `POST /predict`

```json
{"N": 90, "P": 42, "K": 43, "temperature": 20.8, "humidity": 82.0, "ph": 6.5, "rainfall": 202.9}
```

Response (200):

```json
{"crop": "rice", "confidence": 0.97,
 "top3": [{"crop": "rice", "probability": 0.97},
          {"crop": "jute", "probability": 0.02},
          {"crop": "coffee", "probability": 0.01}]}
```

Invalid input (for example `ph = 20`) gives status 422.

`GET /health` returns `{"status": "ok"}`.

## Public URL (steps to be filled in by the team)

1. Start the app locally.
2. Start the tunnel tool (ngrok or cloudflared) on port 8000.
3. Steps that worked: _write them here after Day 8_

## Hosting service (steps to be filled in by the team)

Build command: `pip install -r requirements.txt && python train_model.py`

Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

Notes: _write what worked here after Day 9_

## Team

A: data, KNN, SVM. B: Naive Bayes, Decision Tree, evaluation. C: Random Forest, tuning, saving. D: web app and deployment.