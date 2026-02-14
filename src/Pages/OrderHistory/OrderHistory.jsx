import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Check } from "lucide-react";

function OrderProgress({ status, type }) {
  const steps = ["Order placed", "Shipping", "Completed"];
  let activeStep = 0;

  if (type === "All") activeStep = 0;
  else if (type === "InProgress") activeStep = 1;
  else if (status === "Completed") activeStep = 2;

  return (
    <div className="mt-6 relative w-full">
      <div className="absolute top-3 left-0 w-full h-[3px] bg-gray-200 rounded-full"></div>
      <div
        className="absolute top-3 left-0 h-[3px] bg-pink-500 rounded-full transition-all duration-500"
        style={{
          width:
            type === "All"
              ? "33%"
              : (activeStep / (steps.length - 1)) * 100 + "%",
        }}
      ></div>

      <div className="flex justify-between relative">
        {steps.map((step, index) => {
          const isActive = index <= activeStep;
          const bgColor = isActive ? "bg-pink-500" : "bg-gray-300";
          const textColor = isActive ? "text-pink-500" : "text-gray-400";

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 transition-all ${bgColor} ${
                  isActive
                    ? "border-pink-500 text-white"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {isActive && <Check size={14} className="text-white" />}
              </div>
              <span
                className={`text-xs sm:text-sm mt-2 text-center ${textColor}`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OrderHistory() {
  const demoOrders = [
    {
      id: 123456,
      status: "In progress",
      date: "Jul 31, 2024",
      address: "Maadi, Cairo, Egypt",
    },
    {
      id: 123457,
      status: "Completed",
      date: "Jul 31, 2024",
      address: "Maadi, Cairo, Egypt",
    },
    {
      id: 123458,
      status: "Canceled",
      date: "Jul 31, 2024",
      address: "Maadi, Cairo, Egypt",
    },
  ];

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || demoOrders;
    setOrders(saved);
  }, []);

  let displayOrders = [];
  if (filter === "All") displayOrders = orders;
  else if (filter === "In progress")
    displayOrders = orders.filter((o) => o.status === "In progress");
  else if (filter === "Canceled")
    displayOrders = orders.filter((o) => o.status === "Canceled");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-3 mb-6 flex-wrap overflow-x-auto">
          {["All", "In progress", "Canceled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full text-sm border transition flex-shrink-0 ${
                filter === tab
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-gray-600 border-gray-300 hover:border-pink-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-6">
          {displayOrders.length === 0 && (
            <p className="text-center text-gray-500 py-10">No orders found.</p>
          )}

          {displayOrders.map((order, idx) => (
            <div
              key={order.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4"
            >
              {/* Order Details */}
              <div className="flex-1 flex justify-between flex-col sm:flex-row gap-4 sm:gap-2">
                <div className="space-y-1 text-sm text-gray-500">
                  <p>Order No.</p>
                  <p>Status</p>
                  <p>Date</p>
                  <p>Address</p>
                </div>

                <div className="space-y-1 text-sm text-right relative">
                  {order.status === "In progress" && idx === 0 && (
                    <button className="absolute -top-1 -right-1 text-pink-500 hover:text-pink-700">
                      <FiTrash2 size={18} />
                    </button>
                  )}
                  <p className="font-semibold text-gray-800">#{order.id}</p>
                  <p
                    className={`font-medium ${order.status === "In progress" ? "text-pink-500" : "text-gray-800"}`}
                  >
                    {order.status}
                  </p>
                  <p>{order.date}</p>
                  <p>{order.address}</p>
                </div>
              </div>

              {/* Progress Bar */}
              {(filter === "All" && idx === 0) ||
              (filter === "In progress" && idx === 0) ? (
                <OrderProgress
                  status={order.status}
                  type={filter === "All" ? "All" : "InProgress"}
                />
              ) : null}

              {/* View Detail */}
              {order.status !== "In progress" || filter === "Canceled" ? (
                <div className="mt-4 sm:mt-6">
                  <button className="text-pink-500 text-sm font-medium hover:underline">
                    View order detail →
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
