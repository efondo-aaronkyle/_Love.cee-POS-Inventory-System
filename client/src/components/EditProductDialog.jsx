import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditProductDialog({ product, onUpdate }) {

  const [form, setForm] = useState({ ...product })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    onUpdate({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    })
  }

  return (
    <Dialog>
        <form onSubmit={(e) => e.preventDefault()}>

            <DialogTrigger asChild>
            <Button variant="ghost" className="text-[#9d1a1f] hover:bg-[#caa272]/30 hover:scale-110 hover:shadow-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                </svg>
            </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm bg-white p-0 overflow-hidden rounded-xl">

            <DialogHeader className="bg-[#9d1a1f] px-6 py-4">
                <DialogTitle className="text-white text-lg font-bold">Edit Product</DialogTitle>
                <DialogDescription className="text-white/80 text-sm tracking-wide">
                Update product information.
                </DialogDescription>
            </DialogHeader>

            <FieldGroup className="px-6 py-5 text-lg font-bold text-gray-800 text-center">

                <Field>
                <Label className="text-sm font-semibold">Name</Label>
                <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="focus:ring-[#9d1a1f] border border-[#9d1a1f]/20"
                />
                </Field>

                <Field>
                <Label className="text-sm font-semibold">Price</Label>
                <Input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="focus:ring-[#9d1a1f] border border-[#9d1a1f]/20"
                />
                </Field>

                <Field>
                <Label className="text-sm font-semibold">Stock</Label>
                <Input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    className="focus:ring-[#9d1a1f] border border-[#9d1a1f]/20"
                />
                </Field>

            </FieldGroup>

            <DialogFooter className="px-6 pb-5 gap-2">

                <DialogClose asChild>
                <Button variant="outline" className="rounded-xl">Cancel</Button>
                </DialogClose>

                <DialogClose asChild>
                <Button onClick={handleSubmit} className="bg-[#9d1a1f] hover:bg-[#7f1418] text-white rounded-xl">
                    Save Changes
                </Button>
                </DialogClose>

            </DialogFooter>

            </DialogContent>
        </form>
    </Dialog>
  )
}
