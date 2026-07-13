import 'dotenv/config'
import { connectDB } from './db.js'
import MenuItem from './models/MenuItem.js'
import mongoose from 'mongoose'

// Same items that used to live in the frontend's src/data/menuItems.js.
// Feel free to add more here before seeding.
const menuItems = [
  {
    name: 'Glazed Salmon Bowl',
    price: 24.0,
    description:
      'Fresh Atlantic salmon, quinoa, organic avocado, and honey glaze.',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    alt: 'Salmon Bowl',
  },
  {
    name: 'Truffle Mushroom Pizza',
    price: 19.0,
    description:
      'Wild mushrooms, fresh mozzarella, truffle oil drizzle, and arugula spinach.',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
    alt: 'Truffle Pizza',
  },
  {
    name: 'The Prime Wagyu Burger',
    price: 32.0,
    description:
      'Aged cheddar cheese, caramelized onions, house sauce, brioche bun, and crinkle fries.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    alt: 'Prime Burger',
  },
]

async function seed() {
  await connectDB()

  await MenuItem.deleteMany({})
  const inserted = await MenuItem.insertMany(menuItems)

  console.log(`Seeded ${inserted.length} menu items.`)
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('Seeding failed:', err.message)
  process.exit(1)
})
