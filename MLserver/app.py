from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os

# ==========================================
# Initialize Flask App
# ==========================================
app = Flask(__name__)

# ==========================================
# Load Trained Model
# ==========================================
MODEL_PATH = "patient_risk_model.pkl"

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("Model file not found!")

model = joblib.load(MODEL_PATH)
print("✅ Model Loaded Successfully")

# ==========================================
# Health Check Route
# ==========================================
@app.route("/")
def home():
    return jsonify({
        "status": "Model API Running",
        "message": "Patient Risk Prediction API"
    })

# ==========================================
# Prediction Route
# ==========================================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No input data provided"}), 400

        # Required fields
        required_fields = [
            "Age",
            "Sex",
            "MainSymptom",
            "BP",
            "HR",
            "Temp",
            "ExistingCondition"
        ]

        # Check missing fields
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"{field} is missing"}), 400

        # Convert numeric fields safely
        try:
            data["Age"] = int(data["Age"])
            data["BP"] = int(data["BP"])
            data["HR"] = int(data["HR"])
            data["Temp"] = float(data["Temp"])
        except ValueError:
            return jsonify({"error": "Invalid numeric values"}), 400

        # Convert to DataFrame
        df = pd.DataFrame([data])

        # Make Prediction
        prediction = model.predict(df)[0]

        return jsonify({
            "success": True,
            "risk_percent": round(float(prediction), 2)
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# ==========================================
# Run Server
# ==========================================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5004, debug=True)
