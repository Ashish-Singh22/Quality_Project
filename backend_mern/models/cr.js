const mongoose = require("mongoose");
const { Schema } = mongoose;

const crSchema = new Schema({
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

const crModel = mongoose.model("cr-data", crSchema)

module.exports = crModel;
