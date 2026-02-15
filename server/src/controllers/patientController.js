import axios from "axios";
import { Patient } from "../models/User.js";

// Get total number of patients
export const getTotalPatients = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    res.status(200).json({
      success: true,
      total: totalPatients,
    });
  } catch (error) {
    console.error("Error fetching total patients:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching total patients",
      error: error.message,
    });
  }
};

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching patients",
      error: error.message,
    });
  }
};

// Create simple patient
export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({
      success: false,
      message: "Error creating patient",
      error: error.message,
    });
  }
};

// 🔥 MAIN FUNCTION
export const createPatientAndAIAnalysis = async (req, res) => {
  try {
    const {
      patientId,
      name,
      age,
      gender,
      symptoms,
      bloodPressure,
      heartRate,
      temp,
      previousConditions,
    } = req.body;

    if (!patientId || !name || !age || !gender) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Extract systolic BP
    let systolicBP = 120;
    if (bloodPressure && bloodPressure.includes("/")) {
      systolicBP = parseInt(bloodPressure.split("/")[0]);
    }

    // ==============================
    // 1️⃣ Check if Patient Exists
    // ==============================
    let patient = await Patient.findOne({ patientId });

    if (!patient) {
      // ==============================
      // 2️⃣ Create New Patient
      // ==============================
      patient = new Patient({
        patientId,
        name,
        age,
        gender,
        symptoms,
        bloodPressure,
        heartRate,
        temp,
        previousConditions,
        status: "Active",
      });

      await patient.save();
      console.log("✅ New patient registered");
    } else {
      // ==============================
      // 3️⃣ Update Existing Patient
      // ==============================
      patient.name = name;
      patient.age = age;
      patient.gender = gender;
      patient.symptoms = symptoms;
      patient.bloodPressure = bloodPressure;
      patient.heartRate = heartRate;
      patient.temp = temp;
      patient.previousConditions = previousConditions;

      await patient.save();
      console.log("🔄 Patient details updated");
    }

    // ==============================
    // 4️⃣ Call Flask ML Server
    // ==============================
    const flaskResponse = await axios.post(
      "http://localhost:5004/predict",
      {
        Age: age,
        Sex: gender,
        MainSymptom: symptoms,
        BP: systolicBP,
        HR: heartRate,
        Temp: temp,
        ExistingCondition: previousConditions,
      }
    );

    const riskPercent = flaskResponse.data.risk_percent;

    // ==============================
    // 5️⃣ Assign Department
    // ==============================
    let department = "Outpatient";

    if (riskPercent >= 70) {
      department = "Emergency";
    } else {
      switch (symptoms) {
        case "Chest Pain":
          department = "Cardiology";
          break;
        case "Shortness of Breath":
          department = "Pulmonology";
          break;
        case "Headache":
          department = "Neurology";
          break;
        case "Fever":
        case "Cough":
        case "Fatigue":
          department = "General Medicine";
          break;
        default:
          department = "Outpatient";
      }
    }

    // ==============================
    // 6️⃣ Update Risk + Department
    // ==============================
    patient.riskPercent = riskPercent;
    patient.department = department;

    await patient.save();

    // ==============================
    // 7️⃣ Return Response
    // ==============================
    res.status(200).json({
      success: true,
      message: patient.isNew
        ? "Patient registered successfully"
        : "Patient updated successfully",
      riskPercent,
      department,
      patient,
    });

  } catch (error) {
    console.error("Patient Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

