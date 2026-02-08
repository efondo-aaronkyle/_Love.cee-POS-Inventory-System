import db from "../config/db.js"

const OrderItem = {
  create: async (orderId, productId, quantity, price) => {
    await db.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES (?, ?, ?, ?)`,
      [orderId, productId, quantity, price]
    )
  }
}

export default OrderItem
