import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center  justify-center bg-gray-50 text-center px-4">
      <div className="w-32 h-32 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
        <Check className="w-16 h-16 text-white" />
      </div>
      <h1 className="text-3xl font-bold  mb-4">Successful!</h1>

      <p className="text-gray-600 mb-6">Your order has been confirmed</p>

      <button
        onClick={() => navigate("/")}
        className="bg-pink-600 text-white w-2xl px-6 py-3 rounded-lg hover:bg-pink-700 transition"
      >
        Keep shopping
      </button>
    </div>
  );
}
