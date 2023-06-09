const { mongoose, Schema, model } = require('mongoose');

const nestSchema = new Schema(
  {
    title: String,
    picture: String,
    location: String,
    price: Number,
    description: String,
    // enum: number of dorms, desks, daylight, pet friendly, timezone....
    // rating: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Nest', nestSchema);
