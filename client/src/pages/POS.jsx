import { useState } from "react"

import ProductCard from "@/components/ProductCard"
import CheckoutDialog from "@/components/CheckoutDialog"
import HeaderCard from "@/components/HeaderCard"
import OrderSummary from "@/components/OrderSummary"
import SuccessAlert from "@/components/SuccessAlert"

const products = [
  { id: 1, name: "Red Velvet (Regular)", price: 75 },
  { id: 2, name: "Red Velvet (Mini)", price: 45 },
  { id: 3, name: "Classic (Regular)", price: 60 },
  { id: 4, name: "Classic (Mini)", price: 35 },
  { id: 5, name: "Smores (Regular)", price: 70 },
  { id: 6, name: "Smores (Mini)", price: 40 },
  { id: 7, name: "Original Cheesecake", price: 249 },
  { id: 8, name: "Blueberry Cheesecake", price: 289 },
  { id: 9, name: "Strawberry Cheesecake", price: 289 },
]

export default function POS() {
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState(null)

  const showAlert = (title, message) => {
    setAlert({ title, message })

    setTimeout(() => {
      setAlert(null)
    }, 2500)
  }

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id)

    if (existing) {
      setCart(
        cart.map(i =>
          i.id === product.id
            ? { ...i, qty: i.qty + product.qty }
            : i
        )
      )
    } else {
      setCart([...cart, { ...product }])
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  return (
    <div className="flex flex-col p-4 bg-[#f4f0e5] min-h-screen font-[poppins]">
      {alert && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-2">
          <SuccessAlert
            title={alert.title}
            message={alert.message}
          />
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
        onConfirm={() => {
          showAlert(
            "Order Completed",
            "Payment was successful and cart has been cleared."
          )
          setCart([])
          setOpen(false)
        }}
      />
    </div>
  )
}
