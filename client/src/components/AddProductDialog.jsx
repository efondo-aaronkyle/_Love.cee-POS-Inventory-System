import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddProductDialog({ onAdd }) {

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    onAdd({
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
    })

    setForm({ name: "", price: "", stock: "" })
  }

  return (
    <Dialog>
      <form onSubmit={(e) => e.preventDefault()}>

        <DialogTrigger asChild>
          <Button className="bg-[#9d1a1f] hover:bg-[#7f1418] text-white rounded-xl">
            + Add Product
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm bg-white p-0 overflow-hidden rounded-xl">

          <DialogHeader className="bg-[#9d1a1f] px-6 py-4">
            <DialogTitle className="text-white text-lg font-bold">Add Product</DialogTitle>
            <DialogDescription className="text-white/80 text-sm tracking-wide">
              Enter product details below.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="px-6 py-5 text-center">

            <Field>
              <Label className="text-sm font-semibold">Name</Label>
              <Input name="name" className="focus:ring-[#9d1a1f] border border-[#9d1a1f]/20" value={form.name} onChange={handleChange} />
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
                Add Product
              </Button>
            </DialogClose>

          </DialogFooter>

        </DialogContent>
      </form>
    </Dialog>
  )
}
