import { useState, useEffect } from "react"
import HeaderCard from "@/components/HeaderCard"
import DashboardStatsCard from "@/components/DashboardStatsCard"
import OrderHistorySection from "@/components/OrderHistorySection"
import { fetchDashboardStats, fetchOrdersByDate, fetchOrderDates } from "@/services/productService"

export default function Dashboard() {
  const [stats, setStats] = useState([])
  const [orders, setOrders] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [orderDates, setOrderDates] = useState([])

  useEffect(() => {
    loadDashboard()
  }, [])

  useEffect(() => {
    loadOrders()
  }, [selectedDate, page])

  const loadDashboard = async () => {
    try {
      // 1. Fetch all-time stats
      const statsRes = await fetchDashboardStats(null) // pass null or special route
      setStats([
        { title: "Total Orders", value: statsRes.data.totalOrders || 0 },
        { title: "Total Revenue", value: `₱${statsRes.data.totalRevenue || 0}` },
        { title: "Top Product", value: statsRes.data.topProduct || "N/A" }
      ])

      // 2. Fetch available order dates
      const datesRes = await fetchOrderDates()
      setOrderDates(datesRes.data)

      // Load orders initially (all orders)
      loadOrders()
    } catch (err) {
      console.error(err)
    }
  }

  const loadOrders = async () => {
    try {
      const formattedDate = selectedDate
        ? selectedDate.slice(0, 10) // YYYY-MM-DD
        : null

      const res = await fetchOrdersByDate(formattedDate, page)
      setOrders(res.data.orders)
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFilter = (date) => {
    setPage(1)

    if (date === "all") {
      setSelectedDate(null)
    } else {
      setSelectedDate(date)
    }
  }


  return (
    <div className="flex flex-col p-4 bg-[#f4f0e5] min-h-screen font-[poppins]">

      {/* HEADER */}
      <div className="max-w-6xl w-full mx-auto mb-6">
        <HeaderCard
          title="Dashboard"
          description="Overview of sales performance and order activity."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
                <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.919Z" clipRule="evenodd" />
            </svg>
          }
        />
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto w-full mb-6">
        {stats.map((stat, i) => (
          <DashboardStatsCard key={i} title={stat.title} value={stat.value} />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto w-full mb-6">
        <OrderHistorySection
          orders={orders}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
          onFilter={handleFilter}
          dates={orderDates}
        />
      </div>
    </div>
  )
}
