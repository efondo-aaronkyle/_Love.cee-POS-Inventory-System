import { useState } from "react"
import Navbar from "@/components/Navbar"
import POS from "@/pages/POS"
import Inventory from "@/pages/Inventory"
import Dashboard from "@/pages/Dashboard"

export default function App() {
  const [page, setPage] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar page={page} setPage={setPage} />

      {page === "dashboard" && <Dashboard />}
      {page === "pos" && <POS />}
      {page === "inventory" && <Inventory />}

    </div>
  )
}
