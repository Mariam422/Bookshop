import React, { useState } from "react";
import axios from "axios";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { BiMessageDots } from "react-icons/bi";
import { LuMapPin } from "react-icons/lu";

export default function QuestionsAbout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      const response = await axios.post(
        "https://bookstore.eraasoft.pro/api/contacts/store",
        formData,
      );

      if (response.data.statusCode === 200) {
        setStatusMessage(response.data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatusMessage("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Failed to send message.");
    }

    setLoading(false);
  };

  return (
    <div className="relative bg-[#2C243A] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/Questions.png')] bg-cover bg-center opacity-10"></div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between max-w-6xl mx-auto py-20 px-5 text-white gap-10">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">
            Have a Questions? <br />
            Get in Touch
          </h2>

          <p className="text-gray-300 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-white/10 placeholder-gray-300 focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-white/10 placeholder-gray-300 focus:outline-none"
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 placeholder-gray-300 focus:outline-none"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded h-32 bg-white/10 placeholder-gray-300 focus:outline-none resize-none"
              required
            />

            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-500 transition-colors px-6 py-3 rounded text-white font-medium"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {statusMessage && (
              <p className="text-sm mt-2 text-green-500">{statusMessage}</p>
            )}
          </form>
        </div>

        <div className="flex-1 flex flex-col gap-5">
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
              <MdOutlinePhoneInTalk className="text-pink-600 text-xl" />
            </div>
            <a href="tel:01123456789" className="hover:text-white transition">
              01123456789
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
              <BiMessageDots className="text-pink-600 text-xl" />
            </div>
            <a
              href="mailto:Example@gmail.com"
              className="hover:text-white transition"
            >
              Example@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
              <LuMapPin className="text-pink-600 text-xl" />
            </div>
            123 Main Street, Cairo, Egypt
          </div>
        </div>
      </div>
    </div>
  );
}
