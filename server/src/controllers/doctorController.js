import { Patient } from "../models/User.js";

const deletePatient = async (req, res) => {
    try {
        const { patientId } = req.body;

        if (!patientId) {
            return res.status(400).json({
                success: false,
                message: "Patient ID is required"
            });
        }

        const deletedPatient = await Patient.findOneAndDelete({ patientId });

        if (!deletedPatient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient deleted successfully",
            patient: deletedPatient
        });

    } catch (error) {
        console.error("Delete Patient Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export default deletePatient;