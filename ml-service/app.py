from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import pickle
import os

app = Flask(__name__)

MODEL_PATH = "crop_model.pkl"
ENCODER_PATH = "label_encoder.pkl"

def train_model():
    df = pd.read_csv("Crop_recommendation.csv")
    X = df.drop("label", axis=1)
    y = df["label"]

    le = LabelEncoder()
    y_encoded = le.fit_transform(y)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42
    )

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)
    with open(ENCODER_PATH, "wb") as f:
        pickle.dump(le, f)

    print("✅ Model trained and saved.")
    return model, le

def load_or_train():
    if os.path.exists(MODEL_PATH) and os.path.exists(ENCODER_PATH):
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        with open(ENCODER_PATH, "rb") as f:
            le = pickle.load(f)
        print("✅ Model loaded from cache.")
    else:
        model, le = train_model()
    return model, le

model, le = load_or_train()

@app.route("/health", methods=["GET"])
def health():
    return jsonify({ "status": "ok", "service": "crop-prediction" })

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        required = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        for field in required:
            if field not in data:
                return jsonify({ "error": f"Missing field: {field}" }), 400

        input_df = pd.DataFrame([{
            "N":           float(data["N"]),
            "P":           float(data["P"]),
            "K":           float(data["K"]),
            "temperature": float(data["temperature"]),
            "humidity":    float(data["humidity"]),
            "ph":          float(data["ph"]),
            "rainfall":    float(data["rainfall"]),
        }])

        prediction_encoded = model.predict(input_df)[0]
        crop_name = le.inverse_transform([prediction_encoded])[0]
        proba = model.predict_proba(input_df)[0]
        confidence = round(float(np.max(proba)), 4)

        return jsonify({
            "recommended_crop": crop_name,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({ "error": str(e) }), 500

if __name__ == "__main__":
    # Only accessible internally — not exposed to the internet
    app.run(host="127.0.0.1", port=5001, debug=False)