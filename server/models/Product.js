import db from "../config/db.js"

export const getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products ORDER BY created_at DESC")
  return rows
}

export const getProductById = async (id) => {
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id])
  return rows
}

export const createProduct = async (data) => {
  const { name, price, stock } = data
  const [result] = await db.query(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock]
  )
  return result
}

export const updateProduct = async (id, data) => {
  const { name, price, stock } = data
  const [result] = await db.query(
    "UPDATE products SET name=?, price=?, stock=? WHERE id=?",
    [name, price, stock, id]
  )
  return result
}

export const isProductUsed = async (id) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) AS count FROM order_items WHERE product_id = ?",
    [id]
  )
  return rows[0].count > 0
}

export const deleteProduct = async (id) => {
  const [result] = await db.query("DELETE FROM products WHERE id=?", [id])
  return result
}
