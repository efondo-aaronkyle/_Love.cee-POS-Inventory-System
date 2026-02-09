import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"

dotenv.config()

const app = express()

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/dashboard", dashboardRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
