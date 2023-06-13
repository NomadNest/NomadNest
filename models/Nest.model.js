const { mongoose, Schema, model } = require('mongoose');

const nestSchema = new Schema(
  {
    title: String,
    imageUrl: String,
    location: String,
    price: Number,
    description: String,
    // enum: number of dorms, desks, daylight, pet friendly, timezone....
    // rating: Number
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Nest', nestSchema);
