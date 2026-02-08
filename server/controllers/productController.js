import * as Product from "../models/Product.js"

export const getProducts = async (req, res) => {
  try {
    const rows = await Product.getAllProducts()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getSingleProduct = async (req, res) => {
  try {
    const rows = await Product.getProductById(req.params.id)
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addProduct = async (req, res) => {
  try {
    await Product.createProduct(req.body)
    res.status(201).json({ message: "Product added successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const editProduct = async (req, res) => {
  try {
    await Product.updateProduct(req.params.id, req.body)
    res.json({ message: "Product updated successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params
    const isUsed = await Product.isProductUsed(id)

    if (isUsed) {
      return res.status(400).json({
        message: "Product cannot be deleted because it was used in orders"
      })
    }

    await Product.deleteProduct(id)

    res.json({ message: "Product deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
