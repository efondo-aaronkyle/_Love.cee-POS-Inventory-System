import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"

export default function SuccessAlert({ title, message }) {
  return (
    <Alert className="max-w-md shadow-lg border-green-500 text-green-700 bg-green-50">
      <CheckCircle2Icon className="h-5 w-5" />
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {message}
        </AlertDescription>
      </div>
    </Alert>
  )
}
