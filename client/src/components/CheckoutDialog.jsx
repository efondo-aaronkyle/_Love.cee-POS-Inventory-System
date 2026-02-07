import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle } from "@/components/ui/alert-dialog"

export default function CheckoutDialog({ open, setOpen, total, onConfirm }) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>

      <AlertDialogContent size="sm" className="bg-white p-0 overflow-hidden rounded-xl">

        {/* HEADER */}
        <AlertDialogHeader className="bg-[#9d1a1f] px-6 py-4">
          <AlertDialogMedia>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-10 text-white">
              <path fillRule="evenodd" d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z" clipRule="evenodd" />
            </svg>
          </AlertDialogMedia>
          <AlertDialogTitle className="text-white text-lg font-bold">
            Confirm Checkout
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/80 text-sm tracking-wide">
            Please review your total before confirming payment
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* BODY */}
        <div className="px-6 py-5 text-lg font-bold text-gray-800 text-center">
          Total: ₱{total}
        </div>

        {/* FOOTER */}
        <AlertDialogFooter className="px-6 pb-5 gap-2">
          <AlertDialogCancel className="rounded-xl p-2">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#9d1a1f] hover:bg-[#7f1418] text-white rounded-xl"
            onClick={onConfirm}
          >
            Confirm Payment
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  )
}
