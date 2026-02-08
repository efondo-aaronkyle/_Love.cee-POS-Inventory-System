import db from "../config/db.js"

const Order = {
  create: async (totalAmount) => {
    const [result] = await db.query(
      "INSERT INTO orders (total, order_date) VALUES (?, CURDATE())",
      [totalAmount]
    )
    return result.insertId
  },

  findByDate: async (date) => {
    const [rows] = await db.query(
      "SELECT * FROM orders WHERE order_date = ? ORDER BY created_at DESC",
      [date]
    )
    return rows
  }
}

export default Order
