import { useState } from "react"
import HeaderCard from "@/components/HeaderCard"
import DashboardStatsCard from "@/components/DashboardStatsCard"
import OrderHistorySection from "@/components/OrderHistorySection"

const stats = [
  { title: "Total Orders", value: 24 },
  { title: "Total Revenue", value: "₱4,580" },
  { title: "Top Product", value: "Red Velvet (Regular)" },
]

const orderHistory = [
  {
    id: 1,
    items: ["Red Velvet (Regular) x2", "Classic (Mini) x1"],
    total: 195,
    date: "July 12, 2026"
  },
  {
    id: 2,
    items: ["Original Cheesecake x1"],
    total: 249,
    date: "July 12, 2026"
  },
  {
    id: 3,
    items: ["Classic (Regular) x3"],
    total: 180,
    date: "July 11, 2026"
  },
]

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(null)

  const filteredOrders = selectedDate
    ? orderHistory.filter(order => order.date === selectedDate)
    : orderHistory

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
          <DashboardStatsCard
            key={i}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto w-full mb-6">
        <OrderHistorySection
          orders={filteredOrders}
          onFilter={setSelectedDate}
        />
      </div>
    </div>
  )
}
