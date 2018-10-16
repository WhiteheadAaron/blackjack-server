const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  played: {
    type: String,
    required: true
  },
  wins: {
      type: String,
      required: true
  },
  losses: {
      type: String,
      required: true
  }
});


resultSchema.set("timestamps", true);

resultSchema.set("toObject", {
  virtuals: true, 
  transform: (doc, ret) => {
    delete ret._id; 
    delete ret.__v;
  }
});

module.exports = mongoose.model("Result", resultSchema);