const GetUserExeclModel = require("../models/Execl.js");

const XLSX = require("xlsx");

const GetUserExecl = async (req, res) => {
  try {
    const {
      Roll_no,
      Registration_no,
      Batch_Code,
      Candidate_Name,
      Mother_Name,
      Father_Name,
      DOB,
      Institude_Training_Partner,
      Training_Parner,
      Practical_1,
      Internal_Assessment,
      Project
    } = req.body;

    // Validation (check null or undefined instead of falsy)
    if (
      Roll_no == null ||
      Registration_no == null ||
      Batch_Code == null ||
      !Candidate_Name ||
      !Mother_Name ||
      !Father_Name ||
      !DOB ||
      !Institude_Training_Partner ||
      !Training_Parner ||
      Practical_1 == null ||
      Internal_Assessment == null ||
      Project == null
    ) {
      return res.status(400).json({ Message: "All fields are required!!" });
    }

    // Check if user already exists
    const already = await GetUserExeclModel.findOne({ Registration_no });
    if (already) {
      return res.status(409).json({ Message: "User is already registered" });
    }

    // Create new user
    const create = await GetUserExeclModel.create({
      Roll_no,
      Registration_no,
      Batch_Code,
      Candidate_Name,
      Mother_Name,
      Father_Name,
      DOB: new Date(DOB), // ✅ Convert to Date
      Institude_Training_Partner,
      Training_Parner,
      Practical_1,
      Internal_Assessment,
      Project
    });

    res.status(201).json({ Message: "User data added", user: create });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!!!",
      problem: error.message
    });
  }
};


// Fetch all data (to show on frontend)
const getData = async (req, res) => {
  try {
    const data = await GetUserExeclModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// Download data as Excel
const downloadExcel = async (req, res) => {
  try {
    const data = await GetUserExeclModel.find().lean();

    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Convert workbook to buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Set headers for download
    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: "Error exporting data", error });
  }
};


module.exports = {
  GetUserExecl,
  downloadExcel,
  getData
};
