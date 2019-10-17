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
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Aquarium', AquariumSchema);
