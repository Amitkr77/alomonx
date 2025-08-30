import React from "react";

// Mapping Tailwind colors to avoid dynamic class issues
const colorMap = {
  "blue-500": {
    bg: "bg-blue-500",
    text: "text-blue-500",
  },
  "violet-500": {
    bg: "bg-violet-500",
    text: "text-violet-500",
  },
  "green-500": {
    bg: "bg-green-500",
    text: "text-green-500",
  },
  "yellow-500": {
    bg: "bg-yellow-500",
    text: "text-yellow-500",
  },
  "red-500": {
    bg: "bg-red-500",
    text: "text-red-500",
  },
};

export const ServiceCard = ({
  title,
  description,
  badgeNumber,
  badgeColor,
  Icon,
}) => {
  const { bg, text } = colorMap[badgeColor] || {
    bg: "bg-gray-500",
    text: "text-gray-500",
  };

  return (
    <div className="relative w-72 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 overflow-hidden rounded-xl group">
      {/* Expanding background badge layer */}
      <div
        className={`absolute -top-4 -right-4 w-24 h-24 ${bg} rounded-full group-hover:top-0 group-hover:right-0 z-0 transition-all duration-500 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-none`}
      >
        <p className="absolute bottom-6 left-7 text-white text-2xl font-semibold">
          {badgeNumber}
        </p>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 space-y-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 ${text} transition-all duration-300 ease-in-out group-hover:translate-x-48 group-hover:text-white`}
        >
          {Icon ? <Icon size={48} /> : null}
        </div>

        {/* Text content */}
        <div className="transition-all duration-300 ease-in-out  group-hover:text-white">
          <h1 className="font-bold text-xl group-hover:-translate-y-14">{title}</h1>
          <p className="text-sm text-zinc-500 leading-6 group-hover:-translate-y-7 group-hover:text-white transition-all duration-300 ease-in-out ">{description}</p>
        </div>
      </div>
    </div>
  );
};
