import { Router } from 'express'
import MenuItem from '../models/MenuItem.js'

const router = Router()

// GET /api/menu - list all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: 1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items', details: err.message })
  }
})

// GET /api/menu/:id - single menu item
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Menu item not found' })
    res.json(item)
  } catch (err) {
    res.status(400).json({ error: 'Invalid menu item id', details: err.message })
  }
})

// POST /api/menu - create a new menu item (e.g. admin use)
router.post('/', async (req, res) => {
  try {
    const { name, price, description, image, alt } = req.body
    const item = await MenuItem.create({ name, price, description, image, alt })
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create menu item', details: err.message })
  }
})

// PUT /api/menu/:id - update a menu item
router.put('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) return res.status(404).json({ error: 'Menu item not found' })
    res.json(item)
  } catch (err) {
    res.status(400).json({ error: 'Failed to update menu item', details: err.message })
  }
})

// DELETE /api/menu/:id - remove a menu item
router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ error: 'Menu item not found' })
    res.json({ message: 'Menu item deleted' })
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete menu item', details: err.message })
  }
})

export default router
