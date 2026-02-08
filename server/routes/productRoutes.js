import express from "express"
import {
  getProducts,
  getSingleProduct,
  addProduct,
  editProduct,
  removeProduct
} from "../controllers/productController.js"

const router = express.Router()

router.get("/", getProducts)
router.get("/:id", getSingleProduct)
router.post("/", addProduct)
router.put("/:id", editProduct)
router.delete("/:id", removeProduct)

export default router
