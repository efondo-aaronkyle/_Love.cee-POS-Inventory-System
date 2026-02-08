import { useState } from "react"
import logo from "/assets/images/LoveCee_Logo.png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === "pransi0101" && password === "mochi_mollie") {
      onLogin()
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f0e5] p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <div className="flex justify-center mb-6">
                <img src={logo} alt="Love Cee Logo" className="h-30 w-auto rounded-full hover:scale-120 hover:shadow-xl transition" />
            </div>
            <h2 className="text-2xl font-bold text-[#9d1a1f] text-center mb-6">
                Welcome to Love, Cee
            </h2>
            {error && (
                <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border focus:ring-[#9d1a1f] border-[#9d1a1f]/20"
                />
                <Field className="max-w-sm">
                    <InputGroup className="border border-[#9d1a1f]/20 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#9d1a1f] focus-within:border-[#9d1a1f] transition">
                    <InputGroupInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="focus:outline-none focus:ring-0 focus:border-transparent"
                    />
                    <InputGroupAddon
                        align="inline-end"
                        className="cursor-pointer bg-white transition"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                        <EyeOffIcon className="text-[#9d1a1f]" />
                        ) : (
                        <EyeIcon className="text-[#9d1a1f]" />
                        )}
                    </InputGroupAddon>
                    </InputGroup>
                </Field>
                <Button
                    type="submit"
                    className="bg-[#9d1a1f] text-white hover:bg-[#caa272]"
                >
                    Login
                </Button>
            </form>
        </div>
    </div>
  )
}