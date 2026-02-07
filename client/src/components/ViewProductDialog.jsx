import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ViewProductDialog({ product }) {
  return (
    <Dialog>

        <DialogTrigger asChild>
            <Button variant="ghost" className="text-[#9d1a1f] hover:bg-[#caa272]/30 hover:scale-110 hover:shadow-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                </svg>
            </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm bg-white p-0 overflow-hidden rounded-xl">

            <DialogHeader className="bg-[#9d1a1f] px-6 py-4">
                <DialogTitle className="text-white text-lg font-bold">View Product</DialogTitle>
                <DialogDescription className="text-white/80 text-sm tracking-wide">
                    Product Details
                </DialogDescription>
            </DialogHeader>

            <div className="px-7 py-2 text-lg text-gray-800 text-left">
                <p><strong>Product:</strong> {product.name}</p>
                <p><strong>Price:</strong> ₱{product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
            </div>
        </DialogContent>
    </Dialog>
  )
}
