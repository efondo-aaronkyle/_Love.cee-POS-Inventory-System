import { useState } from "react"
import Navbar from "@/components/Navbar"
import POS from "@/pages/POS"
import Inventory from "@/pages/Inventory"
import Dashboard from "@/pages/Dashboard"
import Login from "@/pages/Login"

export default function App() {
  const [page, setPage] = useState("dashboard")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <div className="min-h-screen bg-[#f4f0e5]">
      <Navbar page={page} setPage={setPage} setIsLoggedIn={setIsLoggedIn} />
      {page === "dashboard" && <Dashboard />}
      {page === "pos" && <POS />}
      {page === "inventory" && <Inventory />}
    </div>
  )
}
