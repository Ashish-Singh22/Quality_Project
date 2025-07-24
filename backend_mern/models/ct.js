const mongoose = require("mongoose");
const { Schema } = mongoose;

const ctSchema = new Schema({
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
    type: Schema.Types.Mixed,  // Accepts any object structure
    required: true
  }
});

const ctModel = mongoose.model("ct-data", ctSchema)

module.exports = ctModel;
