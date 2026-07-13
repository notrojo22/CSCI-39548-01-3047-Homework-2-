const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed with status ${res.status}`)
  }

  return res.json()
}

export async function fetchMenuItems() {
  const items = await request('/menu')
  // Normalize Mongo's _id to id so existing components (Menu, Cart, CartProvider)
  // don't need to change how they key/reference items.
  return items.map(({ _id, ...rest }) => ({ id: _id, ...rest }))
}

export function placeOrder({ items, grandTotal, customer }) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify({ items, grandTotal, customer }),
  })
}
