import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { BsPen } from "react-icons/bs";
import { AuthStore } from "../AuthStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().nullable(),
  address: yup.string().nullable(),
});

export default function Profile() {
  const { user, setUser } = AuthStore();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://bookstore.eraasoft.pro/api/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUser(res.data.data);
        reset(res.data.data);
      } catch {
        toast.error("Failed to load profile data");
      }
    };
    fetchProfile();
  }, [reset, setUser, token]);

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) setAvatar(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      if (avatar) formData.append("image", avatar);

      const res = await axios.post(
        "https://bookstore.eraasoft.pro/api/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setUser(res.data.data);
      reset(res.data.data);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="relative -mt-20 flex justify-center">
        <div className="relative">
          <img
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : user?.image === "default"
                  ? "/Profile.png"
                  : user?.image
            }
            className="w-36 h-36 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
          <label className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white shadow cursor-pointer hover:bg-pink-700 transition">
            <BsPen size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          General Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              {...register("first_name")}
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-pink-500 focus:outline-none"
            />
            <p className="error text-red-500 text-sm mt-1">
              {errors.first_name?.message}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              {...register("last_name")}
              placeholder="Enter your last name"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-pink-500 focus:outline-none"
            />
            <p className="error text-red-500 text-sm mt-1">
              {errors.last_name?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-pink-500 focus:outline-none"
          />
          <p className="error text-red-500 text-sm mt-1">
            {errors.email?.message}
          </p>
        </div>

        <div className="flex flex-col mt-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            {...register("phone")}
            placeholder="0123456789"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            {...register("address")}
            placeholder="Your address"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-pink-500 focus:outline-none"
          />
        </div>
      </form>

      <div className="text-center max-w-xl mx-auto mt-6 mb-96">
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className="w-md px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold text-lg"
        >
          {loading ? "Updating..." : "Update information"}
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}
