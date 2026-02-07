import { Button } from "@/components/ui/button"

export default function OrderSummary({ cart, setCart, total, onCheckout }) {

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <div className="w-full lg:w-96 bg-white rounded-xl shadow-lg p-4 flex flex-col lg:mt-0">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#9d1a1f]">Order Summary</h2>
            {cart.length > 0 && (
            <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="bg-[#9d1a1f] hover:bg-[#7f1418] text-white rounded-xl"
            >
                Clear All
            </Button>
            )}
        </div>

        <div className="flex-1 space-y-2 overflow-auto">
            {cart.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">No items added</p>
                ) : (
                cart.map(item => (
                    <div key={item.id} className="flex justify-between border-b pb-1 items-center">
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">₱{item.price} x {item.qty}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="font-semibold">₱{item.price * item.qty}</p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-[#9d1a1f] hover:bg-[#9d1a1f]/10 rounded-full p-1"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                    </svg>
                                </Button>
                        </div>
                    </div>
                ))
            )}
        </div>

        {cart.length > 0 && (
            <div className="pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold mb-3">
                    <span>Total</span>
                    <span>₱{total}</span>
                </div>

                <Button
                    className="w-full bg-[#9d1a1f] hover:bg-[#7f1418] text-white rounded-xl"
                    onClick={onCheckout}
                >
                    Checkout
                </Button>
            </div>
        )}
    </div>
  )
}
