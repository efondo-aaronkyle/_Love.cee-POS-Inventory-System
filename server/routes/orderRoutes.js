import express from "express"
import { createOrder, getOrdersByDate, getOrderDates } from "../controllers/orderController.js"

const router = express.Router()

router.post("/", createOrder)
router.get("/", getOrdersByDate)
router.get("/dates", getOrderDates)

export default router
