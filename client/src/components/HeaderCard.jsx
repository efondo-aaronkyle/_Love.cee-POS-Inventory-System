import { Card, CardContent } from "@/components/ui/card"

export default function HeaderCard({ title, description, icon }) {
  return (
    <Card className="bg-white shadow-md rounded-xl border-0 border-l-8 border-[#9d1a1f] hover:shadow-xl transition">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="flex items-center justify-center w-20 h-15 sm:w-18 sm:h-18 rounded-full bg-[#9d1a1f]/10 text-[#9d1a1f]">
          <div className="w-8 h-8 sm:w-10 sm:h-10">
            {icon}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[#9d1a1f] text-3xl sm:text-4xl font-bold mb-2">
            {title}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
