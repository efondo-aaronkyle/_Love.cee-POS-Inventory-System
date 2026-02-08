import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductCard({ product, onAdd }) {
    const [qty, setQty] = useState(1)
  return (
    <Card className="hover:shadow-xl hover:scale-101 transition border-none bg-white">

      <CardContent className="p-4 flex flex-col gap-3">

        <div className="h-24 bg-[#caa272]/20 rounded-lg flex items-center justify-center text-gray-500">
          Image
        </div>

        <h3 className="font-semibold text-md">
          {product.name}
        </h3>

        <p className="text-[#9d1a1f] font-bold">
          ₱{product.price}
        </p>

        <Input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="w-full text-center rounded-xl border focus:ring-[#9d1a1f] border-[#9d1a1f]/20"
          placeholder="Qty"
        />

        <Button
          className="bg-[#9d1a1f] hover:bg-[#7f1418] text-white rounded-xl"
          onClick={() => onAdd({ ...product, qty })}
        >
          Add to Cart
        </Button>

      </CardContent>

    </Card>
  )
}