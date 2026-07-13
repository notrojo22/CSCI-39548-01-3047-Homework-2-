import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      required: true,
      validate: (items) => items.length > 0,
    },
    grandTotal: { type: Number, required: true, min: 0 },
    customer: {
      name: { type: String, trim: true, default: '' },
      email: { type: String, trim: true, default: '' },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
)

export default mongoose.model('Order', orderSchema)
