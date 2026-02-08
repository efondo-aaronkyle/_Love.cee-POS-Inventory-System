import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

export default function AlertDestructive({ title, message }) {
  return (
    <Alert variant="destructive" className="max-w-md shadow-lg border-red-500 text-red-700 bg-red-50">
      <AlertCircleIcon className="h-5 w-5" />
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  )
}