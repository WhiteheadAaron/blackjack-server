const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  played: {
    type: Number,
    required: true
  },
  wins: {
      type: Number,
      required: true
  },
  losses: {
      type: Number,
      required: true
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


statSchema.set("timestamps", true);

statSchema.set("toObject", {
  virtuals: true, 
  transform: (doc, ret) => {
    delete ret._id; 
    delete ret.__v;
  }
});

module.exports = mongoose.model("Stat", statSchema);