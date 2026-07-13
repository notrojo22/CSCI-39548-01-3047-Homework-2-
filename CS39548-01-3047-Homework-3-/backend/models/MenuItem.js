import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.model('MenuItem', menuItemSchema)
