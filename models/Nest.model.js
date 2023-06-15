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
    },
    highlight: String,
    website: String,
    // address: { type: { type: String }, coordinates: [Number] },
  },
  {
    timestamps: true
  }
);
// nestSchema.index({ address: '2dsphere' });

module.exports = model('Nest', nestSchema);
