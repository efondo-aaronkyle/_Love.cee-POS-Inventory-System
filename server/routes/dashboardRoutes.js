import express from "express"
import { getDashboardStats, getAllTimeStats } from "../controllers/dashboardController.js"

const router = express.Router()

router.get("/", getDashboardStats)
router.get("/all", getAllTimeStats);

export default router
