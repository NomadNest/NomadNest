const { mongoose, Schema, model } = require('mongoose');

const nestSchema = new Schema(
  {
    title: String,
    imageUrl: String,
    location: String,
    price: Number,
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    highlight: String,
    switches: {
      airport: String,
      accessibility: String,
      daylight: String,
      monitor: String,
      private: String,
      pet: String,
      coffee: String,
      bike: String,
      hike: String,
      gym: String,
      swimm:String,
    },
    website: String,
    email: {
      type: String,
      required: [true, "email required"],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    address: { type: { type: String }, coordinates: [Number] },
  },
  {
    timestamps: true
  }
);

nestSchema.index({ address: '2dsphere' });

module.exports = model('Nest', nestSchema);
