import Order from "../models/Order.js"
import OrderItem from "../models/OrderItem.js"
import db from "../config/db.js"

export const createOrder = async (req, res) => {
  const { items, total } = req.body
  const conn = await db.getConnection()

  try {
    await conn.beginTransaction()

    // 1. Check stock for each item
    for (const item of items) {
      const [[product]] = await conn.query(
        "SELECT stock, name FROM products WHERE id = ? FOR UPDATE",
        [item.productId]
      )

      if (!product) {
        throw new Error("Product not found")
      }

      if (product.stock < item.quantity) {
        await conn.rollback()
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        })
      }
    }

    // 2. Create order
    const [orderResult] = await conn.query(
      "INSERT INTO orders (total, order_date) VALUES (?, CURDATE())",
      [total]
    )
    const orderId = orderResult.insertId

    // 3. Create order items + deduct stock
    for (const item of items) {
      await conn.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.productId, item.quantity, item.price]
      )

      await conn.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.productId]
      )
    }

    await conn.commit()

    res.status(201).json({
      message: "Order created successfully",
      orderId
    })
  } catch (error) {
    await conn.rollback()
    console.error(error)
    res.status(500).json({
      message: error.message || "Failed to create order"
    })
  } finally {
    conn.release()
  }
}

export const getOrdersByDate = async (req, res) => {
  const { date, page = 1 } = req.query
  const limit = 6
  const offset = (page - 1) * limit

  try {
    let where = ""
    const params = []

    if (date) {
      where = "WHERE DATE(order_date) = ?"
      params.push(date)
    }

    // 1. Count total orders
    const [[count]] = await db.query(
      `SELECT COUNT(*) AS total FROM orders ${where}`,
      params
    )

    // 2. Fetch paginated orders
    const [orders] = await db.query(
      `
      SELECT * FROM orders
      ${where}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
      `,
      [...params, limit, offset]
    )

    for (const order of orders) {
      const [items] = await db.query(
        `
        SELECT p.name, oi.quantity, oi.price
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
        `,
        [order.id]
      )

      order.items = items.map(
        i => `${i.name} x${i.quantity} (₱${i.price})`
      )
      order.date = order.order_date
    }

    res.json({
      orders,
      totalPages: Math.ceil(count.total / limit)
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch orders" })
  }
}


export const getOrderDates = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DISTINCT DATE_FORMAT(order_date, '%Y-%m-%d') AS order_date
      FROM orders
      ORDER BY order_date DESC
    `)

    res.json(rows.map(r => r.order_date))
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch order dates" })
  }
}
