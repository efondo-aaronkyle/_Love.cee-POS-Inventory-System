import { Card, CardContent } from "@/components/ui/card"

export default function OrderHistoryCard({ order }) {
  return (
    <Card className="bg-white shadow-md rounded-xl hover:shadow-xl hover:scale-101 transition border-[#9d1a1f]">

      <CardContent className="p-4">

        <div className="flex justify-between mb-2">
          <h3 className="font-bold text-[#9d1a1f]">
            Order #{order.id}
          </h3>
          <span className="text-sm text-gray-500">
            {order.date}
          </span>
        </div>

        <ul className="text-sm text-gray-700 mb-3 list-disc ml-4">
          {order.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <div className="text-right font-bold text-lg">
          Total: ₱{order.total}
        </div>

      </CardContent>

    </Card>
  )
}
