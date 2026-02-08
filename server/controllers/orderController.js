import Order from "../models/Order.js"
import OrderItem from "../models/OrderItem.js"
import db from "../config/db.js"

export const createOrder = async (req, res) => {
  const { items, total } = req.body

  try {
    // 1. Create order
    const orderId = await Order.create(total)

    // 2. Create order items + update stock
    for (const item of items) {
      await OrderItem.create(
        orderId,
        item.productId,
        item.quantity,
        item.price
      )

      await db.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.productId]
      )
    }

    res.status(201).json({
      message: "Order created successfully",
      orderId
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to create order" })
  }
}

export const getOrdersByDate = async (req, res) => {
  const { date } = req.query

  try {
    let query = `SELECT * FROM orders`
    const params = []

    if (date) {
      query += ` WHERE order_date = ?`
      params.push(date)
    }

    query += ` ORDER BY created_at DESC`

    const [orders] = await db.query(query, params)

    for (const order of orders) {
      const [items] = await db.query(
        `SELECT p.name, oi.quantity, oi.price
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [order.id]
      )
      order.items = items.map(i => `${i.name} x${i.quantity} (₱${i.price})`)
      order.date = order.order_date
    }

    res.json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch orders" })
  }
}

export const getOrderDates = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT DISTINCT order_date
      FROM orders
      ORDER BY order_date DESC
      `
    )

    res.json(rows.map(r => r.order_date))
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch order dates" })
  }
}
