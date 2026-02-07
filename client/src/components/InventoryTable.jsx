import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import ViewProductDialog from "@/components/ViewProductDialog"
import EditProductDialog from "@/components/EditProductDialog"
import DeleteProductDialog from "@/components/DeleteProductDialog"

export default function InventoryTable({ products, onDelete, onUpdate }) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="sticky top-0 bg-white z-10">
                <TableHead className="font-bold">Product</TableHead>
                <TableHead className="font-bold text-center" >Price</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead className="font-bold text-center">Stock</TableHead>
                <TableHead className="font-bold text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {products.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} className="text-center text-lg text-gray-500 py-6">
                    No products available
                    </TableCell>
                </TableRow>
                )}

                {products.map(p => (
                    <TableRow key={p.id} className="hover:bg-gray-100">
                        <TableCell>
                        {p.name}
                        </TableCell>
                        <TableCell className="text-center">
                        ₱{p.price}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-center">
                        {p.stock}
                        </TableCell>
                        <TableCell className="flex space-x-0.5 justify-center">
                            <ViewProductDialog product={p} />
                            <EditProductDialog product={p} onUpdate={onUpdate} />
                            <DeleteProductDialog product={p} onDelete={onDelete} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}