import { useState, useEffect } from "react"
import { fetchProducts, createOrder } from "@/services/productService"
import ProductCard from "@/components/ProductCard"
import CheckoutDialog from "@/components/CheckoutDialog"
import HeaderCard from "@/components/HeaderCard"
import OrderSummary from "@/components/OrderSummary"
import SuccessAlert from "@/components/SuccessAlert"
import AlertDestructive from "@/components/AlertDestructive"

export default function POS() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetchProducts()
        setProducts(res.data)
      } catch (err) {
        console.error("Failed to fetch products", err)
      }
    }
    getProducts()
  }, [])
  
  const showAlert = (type, title, message) => {
    setAlert({ type, title, message })
    setTimeout(() => setAlert(null), 2500)
  }

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id)
    if (existing) {
      setCart(
        cart.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + product.qty } : i
        )
      )
    } else {
      setCart([...cart, { ...product }])
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleCheckout = async () => {
    try {
      const items = cart.map(item => ({
        productId: item.id,
        quantity: item.qty,
        price: item.price
      }))

      // POST to backend
      const res = await createOrder({ items, total })

      showAlert("success", "Order Completed", `Order #${res.data.orderId} was successful.`)
      setCart([])
      setOpen(false)

      // Optionally refresh products to update stock
      const refreshed = await fetchProducts()
      setProducts(refreshed.data)

    } catch (err) {
        const msg =
          err.response?.data?.message ||
          "Insufficient stock or server error."

        showAlert("error", "Checkout Failed", msg)
    }
  }

  return (
    <div className="flex flex-col bg-[#f4f0e5] min-h-screen font-[poppins]">
      <div className="flex-1 items-center justify-center p-4">
        {alert && (
          <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-2">
            {alert.type === "success" ? (
              <SuccessAlert
                title={alert.title}
                message={alert.message}
              />
            ) : (
              <AlertDestructive
                title={alert.title}
                message={alert.message}
              />
            )}
          </div>
        )}

        {/* HEADER */}
        <div className="max-w-6xl w-full mx-auto mb-6">
          <HeaderCard
            title="Point of Sale"
            description="Easily add products to the cart, review orders, and checkout smoothly."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
                <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
            }
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row gap-4 max-w-6xl w-full mx-auto">

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
            {products.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={addToCart}
              />
            ))}
          </div>

          {/* CART */}
          <OrderSummary
            cart={cart}
            setCart={setCart}
            total={total}
            onCheckout={() => setOpen(true)}
          />

        </div>

        <CheckoutDialog
          open={open}
          setOpen={setOpen}
          total={total}
          onConfirm={handleCheckout}
        />
      </div>
      <footer className="w-full py-4 text-center text-sm text-white border-t-2 bg-[#9d1a1f] border-[#9d1a1f]">
        © {new Date().getFullYear()} • Built by{" "}
        <a
          href="https://github.com/efondo-aaronkyle"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          efondo-aaronkyle
        </a>
      </footer>
    </div>
  )
}
