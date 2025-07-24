const mongoose = require("mongoose");
const { Schema } = mongoose;

const pftSchema = new Schema({
  week: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  claim_status:{
    type: String,
    required: true
  },
  data: {
    type: Schema.Types.Mixed,  // Accepts any objepft strupfture
    required: true
  }
});

const pftModel = mongoose.model("pft-data", pftSchema)

module.exports = pftModel;
