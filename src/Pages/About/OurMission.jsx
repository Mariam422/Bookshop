import React, { useState } from "react";

export default function OurMission({ missions = [] }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section className="py-30 bg-gray-50 ">
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Our Mission
      </h3>

      <div className="py-5 max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
        {missions.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="flex flex-col p-6 rounded-xl bg-white  transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>

              <p className="text-gray-600 text-sm mt-3">
                {isExpanded ? item.fullText : item.shortText}
              </p>

              {item.isSoon ? (
                <span className="mt-4 text-pink-500 font-semibold cursor-not-allowed">
                  Soon
                </span>
              ) : (
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="mt-4 text-pink-500 font-semibold self-start"
                >
                  {isExpanded ? "View Less" : "View More"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
