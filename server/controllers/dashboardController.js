import db from "../config/db.js"

export const getDashboardStats = async (req, res) => {
  const { date } = req.query
  const selectedDate = date || new Date().toISOString().slice(0, 10)

  try {
    const [[summary]] = await db.query(
      `
      SELECT 
        COUNT(*) AS totalOrders,
        IFNULL(SUM(total), 0) AS totalRevenue
      FROM orders
      WHERE order_date = ?
      `,
      [selectedDate]
    )

    const [[topProduct]] = await db.query(
      `
      SELECT 
        p.name,
        SUM(oi.quantity) AS totalSold
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.order_date = ?
      GROUP BY p.id
      ORDER BY totalSold DESC
      LIMIT 1
      `,
      [selectedDate]
    )

    res.json({
      totalOrders: summary.totalOrders,
      totalRevenue: summary.totalRevenue,
      topProduct: topProduct ? topProduct.name : "N/A"
    })
  } catch (error) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch dashboard stats" })
  }
}

export const getAllTimeStats = async (req, res) => {
  try {
    const [[summary]] = await db.query(`
      SELECT 
        COUNT(*) AS totalOrders,
        IFNULL(SUM(total), 0) AS totalRevenue
      FROM orders
    `);

    const [[topProduct]] = await db.query(`
      SELECT 
        p.name,
        SUM(oi.quantity) AS totalSold
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN orders o ON oi.order_id = o.id
      GROUP BY p.id
      ORDER BY totalSold DESC
      LIMIT 1
    `);

    res.json({
      totalOrders: summary.totalOrders,
      totalRevenue: summary.totalRevenue,
      topProduct: topProduct ? topProduct.name : "N/A"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch all-time stats" });
  }
};