import React from "react";
import { Minus, Plus, Trash } from "lucide-react";
import useCartStore from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className="rounded-lg border p-4 shadow-sm border-slate-700 bg-slate-800 relative">
      <div className="flex justify-between pb-3">
        <div className="flex flex-col">
          <p className="text-lg capitalize font-bold text-slate-100">
            {item.name}
          </p>
          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        </div>
        <label className="sr-only">Choose quantity:</label>
        <div className="flex items-center gap-2">
          <button
            className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
							  focus:ring-blue-500 ${
                  item.quantity === 1
                    ? "disabled opacity-50 hover:opacity-50 hover:bg-gray-700 cursor-not-allowed focus:ring-0"
                    : ""
                }`}
            onClick={
              item.quantity === 1
                ? null
                : () => updateQuantity(item._id, item.quantity - 1)
            }
          >
            <Minus className="text-gray-300" />
          </button>
          <p className="px-3 py-[0.01rem] bg-slate-700">{item.quantity}</p>
          <button
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
						focus:ring-2 focus:ring-blue-500"
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
          >
            <Plus className="text-gray-300" />
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex">
          <img
            className="max-w-[150px] rounded object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 absolute right-6 bottom-6">
        <button
          className="inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline"
          onClick={() => removeFromCart(item._id)}
        >
          <Trash />
        </button>
      </div>
      <div className="md:order-4 md:w-32 absolute top-16 right-4">
        <p className="text-end text-lg font-bold text-blue-400">
          ${item.price}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
