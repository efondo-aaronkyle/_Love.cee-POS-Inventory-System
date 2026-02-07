import { Card, CardContent } from "@/components/ui/card"

export default function DashboardStatsCard({ title, value }) {
  return (
    <Card className="bg-white shadow-md rounded-xl hover:shadow-xl hover:scale-101 transition border-l-8 border-[#9d1a1f]">

      <CardContent className="p-5 text-center">

        <p className="text-gray-500 text-sm mb-1">
          {title}
        </p>

        <h2 className="text-2xl font-extrabold text-[#9d1a1f]">
          {value}
        </h2>

      </CardContent>

    </Card>
  )
}
