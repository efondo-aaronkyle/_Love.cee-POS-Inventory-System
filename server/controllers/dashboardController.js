import db from "../config/db.js"

export const getDashboardStats = async (req, res) => {
  const { date } = req.query

  let where = ""
  const params = []

  if (date) {
    where = "WHERE order_date = ?"
    params.push(date)
  }

  try {
    const [[summary]] = await db.query(
      `
      SELECT COUNT(*) AS totalOrders,
             IFNULL(SUM(total), 0) AS totalRevenue
      FROM orders
      ${where}
      `,
      params
    )

    const [[topProduct]] = await db.query(
      `
      SELECT p.name, SUM(oi.quantity) AS totalSold
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN orders o ON oi.order_id = o.id
      ${where}
      GROUP BY p.id
      ORDER BY totalSold DESC
      LIMIT 1
      `,
      params
    )

    res.json({
      totalOrders: summary.totalOrders,
      totalRevenue: summary.totalRevenue,
      topProduct: topProduct?.name || "N/A"
    })
  } catch (err) {
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