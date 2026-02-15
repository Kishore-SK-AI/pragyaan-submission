import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HeartIcon } from "@heroicons/react/24/outline";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Badge } from "../components/ui/Badge";

interface AnalysisForm {
  patientId: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  symptoms: string;
  bpSys: number;
  bpDia: number;
  heartRate: number;
  temp: number;
  previousCondition: string;
}

interface AnalysisResult {
  message: string;
  riskPercent: number;
  department: string;
  patient: {
    patientId: string;
    name: string;
    age: number;
    gender: string;
    symptoms: string;
    bloodPressure: string;
    heartRate: number;
    temp: number;
    previousConditions: string;
    status: string;
  };
}

export const PatientAnalysisPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnalysisForm>({
    defaultValues: {
      patientId: "",
      age: 45,
      gender: "Male",
      bpSys: 120,
      bpDia: 80,
      heartRate: 72,
      temp: 36.6,
      symptoms: "None",
      previousCondition: "None",
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const onSubmit = async (data: AnalysisForm) => {
    setIsProcessing(true);

    try {
      const res = await fetch("/api/patients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: data.patientId,
          name: data.name,
          age: data.age,
          gender: data.gender,
          symptoms: data.symptoms,
          bloodPressure: `${data.bpSys}/${data.bpDia}`,
          heartRate: data.heartRate,
          temp: data.temp,
          previousConditions: data.previousCondition,
        }),
      });

      const response = await res.json();

      if (!response.success) throw new Error("Failed to register patient");
      
      // Store the full backend response
      setResult(response);
      setShowResult(true);
    } catch (error) {
      console.error(error);
      alert("Failed to register patient");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Patient Triage Analysis
          </h1>
          <p className="text-slate-600">
            AI-powered risk stratification using real-time vitals and symptom data.
          </p>
        </div>

        <GlassCard className="mb-8 border-t-4 border-t-secondary shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Patient Demographics */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                1. Patient Demographics
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Patient ID
                  </label>
                  <input
                    {...register("patientId", { required: true })}
                    className="input-field"
                    placeholder="e.g. P001"
                  />
                  {errors.patientId && (
                    <span className="text-xs text-red-500">
                      Patient ID is required
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="input-field"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500">
                      Name is required
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    {...register("age", { valueAsNumber: true })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Gender
                  </label>
                  <select {...register("gender")} className="input-field">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Previous Condition
                  </label>
                  <select
                    {...register("previousCondition")}
                    className="input-field"
                  >
                    <option value="None">None</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="High Blood Pressure">
                      High Blood Pressure
                    </option>
                    <option value="Heart Disease">Heart Disease</option>
                    <option value="Asthma">Asthma</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Vitals */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                2. Vital Signs
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <div>
                  <label className="block text-xs font-medium uppercase">
                    Sys BP
                  </label>
                  <input
                    type="number"
                    {...register("bpSys", { valueAsNumber: true })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase">
                    Dia BP
                  </label>
                  <input
                    type="number"
                    {...register("bpDia", { valueAsNumber: true })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase">
                    Heart Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      {...register("heartRate", { valueAsNumber: true })}
                      className="input-field"
                    />
                    <HeartIcon className="h-4 w-4 absolute right-3 top-3 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase">
                    Temperature
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("temp", { valueAsNumber: true })}
                    className="input-field"
                  />
                </div>

              </div>
            </div>

            {/* Symptoms */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                3. Symptoms
              </h3>

              <select
                {...register("symptoms", { required: true })}
                className="input-field"
              >
                <option value="None">None</option>
                <option value="Fever">Fever</option>
                <option value="Cough">Cough</option>
                <option value="Chest Pain">Chest Pain</option>
                <option value="Headache">Headache</option>
                <option value="Shortness of Breath">Shortness of Breath</option>
                <option value="Fatigue">Fatigue</option>
              </select>

              {errors.symptoms && (
                <span className="text-xs text-red-500">
                  Symptom is required
                </span>
              )}
            </div>

            <Button type="submit" isLoading={isProcessing}>
              {isProcessing ? "Analyzing..." : "Run AI Risk Assessment"}
            </Button>

          </form>
        </GlassCard>
      </div>

      {/* Result Modal */}
      <Modal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        title="AI Analysis Result"
        maxWidth="2xl"
      >
        {result && (
          <div className="space-y-6">
            {/* Risk Assessment Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* Risk Circle */}
                  <div 
                    className="relative w-24 h-24 rounded-full flex items-center justify-center border-4 bg-white"
                    style={{
                      borderColor: result.riskPercent >= 70 ? '#dc2626' : result.riskPercent >= 40 ? '#f59e0b' : '#10b981'
                    }}
                  >
                    <div className="text-center">
                      <div 
                        className="text-2xl font-bold"
                        style={{
                          color: result.riskPercent >= 70 ? '#dc2626' : result.riskPercent >= 40 ? '#f59e0b' : '#10b981'
                        }}
                      >
                        {result.riskPercent}%
                      </div>
                      <div className="text-xs text-gray-500">Risk</div>
                    </div>
                  </div>

                  {/* Risk Info */}
                  <div>
                    <div 
                      className="text-xl font-bold mb-1"
                      style={{
                        color: result.riskPercent >= 70 ? '#dc2626' : result.riskPercent >= 40 ? '#f59e0b' : '#10b981'
                      }}
                    >
                      {result.riskPercent >= 70 ? 'High Risk' : result.riskPercent >= 40 ? 'Medium Risk' : 'Low Risk'}
                    </div>
                    <div className="text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Recommended Department:</span>
                      <Badge variant={result.riskPercent >= 70 ? 'danger' : result.riskPercent >= 40 ? 'warning' : 'success'}>
                        {result.department}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            {result.patient && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Patient ID</div>
                    <div className="text-sm font-semibold text-gray-900">{result.patient.patientId}</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Full Name</div>
                    <div className="text-sm font-semibold text-gray-900">{result.patient.name}</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Age</div>
                    <div className="text-sm font-semibold text-gray-900">{result.patient.age} years</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Gender</div>
                    <div className="text-sm font-semibold text-gray-900">{result.patient.gender}</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Symptoms</div>
                    <div className="text-sm font-semibold text-gray-900">{result.patient.symptoms}</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Blood Pressure</div>
                    <div className="text-sm font-semibold text-gray-900">{result.patient.bloodPressure} mmHg</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Heart Rate</div>
                    <div className="text-sm font-semibold text-gray-900">{result.patient.heartRate} bpm</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Temperature</div>
                    <div className="text-sm font-semibold text-gray-900">{result.patient.temp}°F</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Previous Conditions</div>
                    <div className="text-sm font-semibold text-gray-900">{result.patient.previousConditions}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Message */}
            {result.message && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm text-blue-800">
                  <span className="font-medium">ℹ️ Note:</span> {result.message}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
