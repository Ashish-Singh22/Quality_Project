const mongoose = require("mongoose");
const { Schema } = mongoose;

const clSchema = new Schema({
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

const clModel = mongoose.model("cl-data", clSchema)

module.exports = clModel;
