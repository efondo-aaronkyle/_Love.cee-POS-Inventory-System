import { Card, CardContent } from "@/components/ui/card"
import OrderHistoryCard from "@/components/OrderHistoryCard"
import DateFilter from "@/components/DateFilter"
import DashboardPagination from "@/components/DashboardPagination"

export default function OrderHistorySection({ orders, onFilter }) {
  return (
    <Card className="bg-white shadow-lg rounded-2xl border border-[#9d1a1f]/15">

      <CardContent className="flex flex-col gap-5">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <h2 className="text-xl font-bold text-[#9d1a1f] tracking-wide">
            Order History
          </h2>

          <DateFilter onChange={onFilter} />

        </div>

        {/* ORDER LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {orders.length === 0 ? (
            <p className="text-gray-500 italic col-span-full text-center py-6">
              No orders found for selected date
            </p>
          ) : (
            orders.map(order => (
              <OrderHistoryCard
                key={order.id}
                order={order}
              />
            ))
          )}

        </div>

        {/* PAGINATION INSIDE CARD */}
        <div className="flex justify-center pt-2">

          <DashboardPagination />

        </div>

      </CardContent>

    </Card>
  )
}