import { useState } from "react"
import HeaderCard from "@/components/HeaderCard"
import InventoryTable from "@/components/InventoryTable"
import AddProductDialog from "@/components/AddProductDialog"
import SuccessAlert from "@/components/SuccessAlert"

const initialProducts = [
  { id: 1, name: "Red Velvet (Regular)", price: 75, stock: 20 },
  { id: 2, name: "Classic (Regular)", price: 60, stock: 15 },
  { id: 3, name: "Original Cheesecake", price: 249, stock: 8 },
]

export default function Inventory() {
  const [products, setProducts] = useState(initialProducts)
  const [alert, setAlert] = useState(null)

  const showAlert = (title, message) => {
    setAlert({ title, message })

    setTimeout(() => {
      setAlert(null)
    }, 2500) // auto hide
  }

  // ADD
  const handleAdd = (newProduct) => {
    setProducts(prev => [...prev, newProduct])

    showAlert(
      "Product Added",
      `${newProduct.name} was added successfully.`
    )
  }

  // DELETE
  const handleDelete = (id) => {
    const deleted = products.find(p => p.id === id)
    setProducts(prev => prev.filter(p => p.id !== id))

    showAlert(
      "Product Deleted",
      `${deleted.name} was removed from inventory.`
    )
  }

  // EDIT
  const handleUpdate = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    )

    showAlert(
      "Product Updated",
      `${updatedProduct.name} was updated successfully.`
    )
  }

  return (
    <div className="flex flex-col p-4 bg-[#f4f0e5] min-h-screen font-[poppins] relative">
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
          title="Inventory"
          description="Manage your product's stock levels with full control."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
              <path d="M3.75 3A1.75 1.75 0 0 0 2 4.75v3.26a3.235 3.235 0 0 1 1.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0 0 16.25 5h-4.836a.25.25 0 0 1-.177-.073L9.823 3.513A1.75 1.75 0 0 0 8.586 3H3.75ZM3.75 9A1.75 1.75 0 0 0 2 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 15.25v-4.5A1.75 1.75 0 0 0 16.25 9H3.75Z" />
            </svg>
          }
        />
      </div>
      {/* CONTENT */}
      <div className="max-w-6xl w-full mx-auto bg-white rounded-xl shadow-lg p-4">

        {/* ADD PRODUCT BUTTON */}
        <div className="flex justify-end mb-4">
          <AddProductDialog onAdd={handleAdd}/>
        </div>

        {/* TABLE */}
        <InventoryTable products={products} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  )
}
