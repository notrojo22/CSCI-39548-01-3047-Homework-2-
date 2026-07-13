import { Router } from 'express'
import Order from '../models/Order.js'

const router = Router()

// GET /api/orders - list all orders (most recent first)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message })
  }
})

// GET /api/orders/:id - single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: 'Invalid order id', details: err.message })
  }
})

// POST /api/orders - place a new order (this is what checkout calls)
router.post('/', async (req, res) => {
  try {
    const { items, grandTotal, customer } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must include at least one item' })
    }

    const order = await Order.create({
      items: items.map((item) => ({
        menuItem: item.id ?? item.menuItem,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      grandTotal,
      customer,
    })

    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ error: 'Failed to place order', details: err.message })
  }
})

// PUT /api/orders/:id - update order status (e.g. pending -> confirmed)
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    )
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: 'Failed to update order', details: err.message })
  }
})

export default router
