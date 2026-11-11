from pathlib import Path
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV
FEATURES = [
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall"
]
def build_random_forest():
    model=RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )
    return model

def tune_random_forest(X_train,y_train):
    param_grid={
        "n_estimators":[100,200,300],
        "max_depth":[None,10,20]
    }
    grid=GridSearchCV(
        RandomForestClassifier(random_state=42),
        param_grid,
        cv=5,
        n_jobs=-1
    )
    grid.fit(X_train,y_train)
    print("Best parameters:",grid.best_params_)
    print("Best score:",grid.best_score_)
    return grid.best_estimator_

def show_feature_importance(model):
    importance=zip(FEATURES,model.feature_importances_)

    importance=sorted(importance,key=lambda x:x[1],reverse=True)
    print("\nFeature Importance")

    for feature,score in importance:
        print(feature,":",round(score,4))

def save_model(model,path="backend/crop_model.pkl"):
    Path(path).parent.mkdir(
        parents=True,
        exist_ok=True
    )
    joblib.dump(model,path)
    print("Model saved successfully at:",path)