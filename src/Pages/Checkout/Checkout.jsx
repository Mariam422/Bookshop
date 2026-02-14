import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCartStore } from "../../Store/useCartStore";
import { CgAdd } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";
import { FiMinusCircle } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { SlNote } from "react-icons/sl";

export default function Checkout() {
  const { cartItems, fetchCart, updateQuantity, removeFromCart } =
    useCartStore();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [note, setNote] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cartItems || cartItems.length === 0)
    return <div className="text-center py-20">Your cart is empty</div>;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const tax = 4;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const onSubmit = (data) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
      status: "Processing",
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder]),
    );

    toast.success("Order placed successfully 🎉");

    setTimeout(() => {
      navigate("/orders");
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-50 py-10 px-4 md:px-10"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Shipping Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("name")}
                placeholder="Name"
                className="input"
              />
              <input
                {...register("phone")}
                placeholder="Phone"
                className="input"
              />
              <input
                {...register("email")}
                placeholder="Email"
                className="input"
              />
              <input
                {...register("city")}
                placeholder="City"
                className="input"
              />
              <input
                {...register("state")}
                placeholder="State"
                className="input"
              />
              <input {...register("zip")} placeholder="Zip" className="input" />
              <input
                {...register("address")}
                placeholder="Address"
                className="input col-span-2"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

            <div className="flex gap-3 flex-wrap">
              {["online", "cash", "pos"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-2 border rounded-lg px-4 py-3 cursor-pointer transition ${
                    paymentMethod === method
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-pink-600"
                  />
                  {method === "online" && "Online payment"}
                  {method === "cash" && "Cash on delivery"}
                  {method === "pos" && "POS on delivery"}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="font-medium mb-3">Note</h2>

            <div className="flex items-start gap-2 border border-gray-300 rounded px-3 py-2">
              <SlNote className="text-gray-400 mt-1" />
              <textarea
                className="flex-1 resize-none outline-none"
                placeholder="Add note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-6 h-fit">
          <h2 className="text-lg font-semibold mb-6">Order summary</h2>

          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start gap-4 border-b pb-4"
              >
                <div className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-20 object-cover rounded-md"
                  />

                  <div className="flex flex-col">
                    <h4 className="font-semibold text-sm">
                      {item.product.title}
                    </h4>

                    <span className="text-xs text-gray-500">
                      Author: {item.product.author}
                    </span>

                    <div className="flex items-center gap-2 mt-1 border border-gray-300 rounded px-3 py-1 text-gray-500 font-medium text-sm">
                      <TbTruckDelivery size={14} /> Free Shipping
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center  rounded text-sm"
                      >
                        <FiMinusCircle className="text-pink-600 text-xl" />
                      </button>

                      <span className="text-sm">{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center  rounded text-sm"
                      >
                        <CgAdd className="text-pink-600 text-xl" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="font-semibold">
                    ${item.product.price * item.quantity}
                  </span>

                  <button onClick={() => removeItem(item.id)}>
                    <FaRegTrashAlt className="text-pink-400 hover:text-red-500 transition text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <label className="text-sm text-gray-500">
              Have a discount code?
            </label>

            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter Promo Code"
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
              />
              <button
                type="button"
                className="bg-gray-800 text-white px-4 rounded-lg text-sm"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span>${tax}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>$0</span>
            </div>

            <hr className="my-2 border-gray-200" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total (USD)</span>
              <span className="text-pink-600">${total}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium"
          >
            Confirm order
          </button>
        </div>
      </div>
    </form>
  );
}
