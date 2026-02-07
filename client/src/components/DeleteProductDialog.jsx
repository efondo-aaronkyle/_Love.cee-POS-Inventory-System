import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

export default function DeleteProductDialog({ product, onDelete }) {

  return (
    <AlertDialog>

        <AlertDialogTrigger asChild>
            <Button variant="ghost" className="text-[#9d1a1f] hover:bg-[#caa272]/30 hover:scale-110 hover:shadow-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                </svg>
            </Button>
        </AlertDialogTrigger>

        <AlertDialogContent size="sm" className="bg-white p-0 overflow-hidden rounded-xl">

            <AlertDialogHeader className="bg-[#9d1a1f] px-6 py-4">
                <AlertDialogMedia>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-10 text-white">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                    </svg>
                </AlertDialogMedia>
                <AlertDialogTitle className="text-white text-lg font-bold">
                    Delete Product
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white/80 text-sm tracking-wide">
                    This action cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="px-6 py-5 text-lg font-bold text-gray-800 text-center">
                Are you sure you want to delete{" "} <span className="font-semibold">{product.name}</span>?
            </div>

            <AlertDialogFooter className="px-6 pb-5 gap-2">
                <AlertDialogCancel className="rounded-xl">
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    className="bg-[#9d1a1f] hover:bg-[#7f1418] text-white rounded-xl"
                    onClick={() => onDelete(product.id)}
                >
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
