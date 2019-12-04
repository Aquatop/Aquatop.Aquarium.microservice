import mongoose from 'mongoose';

const AquariumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    fictionalName: {
      type: String,
    },
    fish: {
      type: String,
    },
    fishQuantity: {
      type: Number,
    },
    foodQuantity: {
      type: Number,
    },
    foodInterval: {
      type: String,
    },
    turnOnLight: {
      type: String,
    },
    turnOffLight: {
      type: String,
    },
    pin: {
      type: String,
    },
    owner: {
      type: String,
      default: 'owner',
    },
  },
  { timestamps: true }
);

AquariumSchema.pre('save', function(next) {
  let pin = '';

  for (let i = 0; i < 4; i++) {
    pin += String(Math.floor(Math.random() * 10));
  }

  this.pin = pin;

  next();
});

export default mongoose.model('Aquarium', AquariumSchema);
