const tocModel = require('../../models/toc'); // Adjust path if needed

const tocFindController = async (req, res) => {
  try {
    const { weekMonthPairs } = req.body;

    if (!Array.isArray(weekMonthPairs)) {
      return res.status(400).json({ message: "Missing or invalid weekMonthPairs field" });
    }

    // Build an array of query conditions like: [{ week: 1, month: 1 }, { week: 2, month: 1 }, ...]
    const queryConditions = weekMonthPairs.map(pair => {
      if (!Array.isArray(pair) || pair.length !== 2) return null;
      const [week, month] = pair;
      return { week, month };
    }).filter(Boolean); // remove nulls in case of invalid pairs

    // Use $or to match any of the pairs
    const results = await tocModel.find({
      $or: queryConditions
    });

    return res.status(200).json({
      message: "Filtered toc data fetched successfully",
      success: true,
      error: false,
      data: results,
    });
  } catch (error) {
    console.error("Error fetching toc records:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: true,
    });
  }
};

module.exports = tocFindController;
