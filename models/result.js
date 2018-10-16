
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

// Add `createdAt` and `updatedAt` fields
resultSchema.set("timestamps", true);

resultSchema.set("toObject", {
  virtuals: true, // include built-in virtual `id`
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.__v;
  }
});

module.exports = mongoose.model("Result", resultSchema);