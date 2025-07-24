const tocModel = require('../../models/toc'); // adjust path if needed

const tocUploadController = async (req, res) => {
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
    const insertedRecords = await tocModel.insertMany(data);

    res.status(200).json({
      message: "toc records uploaded successfully",
      success: true,
      error: false,
      insertedCount: insertedRecords.length
    });
  } catch (error) {
    console.error("Error uploading toc records:", error);
    res.status(500).json({ 
      message: error.message || "Internal server error",
      success: false,
      error: true
    });
  }
};

module.exports = tocUploadController;
