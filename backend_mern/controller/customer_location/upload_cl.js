const clModel = require('../../models/cl'); // adjust path if needed

const clUploadController = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ 
        message: "No records provided in 'data'", 
        success: false, 
        error: true 
      });
    }

    // Insert each record as a separate document
    const insertedRecords = await clModel.insertMany(data);

    res.status(200).json({
      message: "cl records uploaded successfully",
      success: true,
      error: false,
      insertedCount: insertedRecords.length
    });
  } catch (error) {
    console.error("Error uploading cl records:", error);
    res.status(500).json({ 
      message: error.message || "Internal server error",
      success: false,
      error: true
    });
  }
};

module.exports = clUploadController;
