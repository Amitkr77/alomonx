import React from "react";

// Mapping Tailwind colors to avoid dynamic class issues
const colorMap = {
  "blue-500": {
    bg: "bg-blue-500",
    text: "text-blue-500",
    gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  "violet-500": {
    bg: "bg-violet-500",
    text: "text-violet-500",
    gradient: "bg-gradient-to-br from-violet-500 to-violet-700",
  },
  "green-500": {
    bg: "bg-green-500",
    text: "text-green-500",
    gradient: "bg-gradient-to-br from-green-500 to-green-700",
  },
  "yellow-500": {
    bg: "bg-yellow-500",
    text: "text-yellow-500",
    gradient: "bg-gradient-to-br from-yellow-500 to-yellow-700",
  },
  "red-500": {
    bg: "bg-red-500",
    text: "text-red-500",
    gradient: "bg-gradient-to-br from-red-500 to-red-700",
  },
};

export const ServiceCard = ({
  title,
  description,
  badgeNumber,
  badgeColor,
  Icon,
  badgePosition = "top-right",
}) => {
  const { bg, text, gradient } = colorMap[badgeColor] || {
    bg: "bg-gray-500",
    text: "text-gray-500",
    gradient: "bg-gradient-to-br from-gray-500 to-gray-700",
  };

  // Dynamic badge positioning
  const positionStyles = {
    "top-right": "-top-4 -right-4 group-hover:top-0 group-hover:right-0",
    "top-left": "-top-4 -left-4 group-hover:top-0 group-hover:left-0",
    "bottom-right": "-bottom-4 -right-4 group-hover:bottom-0 group-hover:right-0",
    "bottom-left": "-bottom-4 -left-4 group-hover:bottom-0 group-hover:left-0",
  };

  return (
    <div
      className="relative w-full max-w-xs bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 overflow-hidden rounded-xl group hover:shadow-[0px_0px_20px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-500 ease-custom cursor-pointer"
      role="article"
      aria-label={`Service card: ${title}`}
    >
      {/* Expanding background badge layer */}
      <div
        className={`absolute w-24 h-24 ${gradient} rounded-full z-0 transition-all duration-700 ease-custom group-hover:w-full group-hover:h-full group-hover:rounded-none ${positionStyles[badgePosition]}`}
      >
        <p className="absolute bottom-6 left-7 text-white text-2xl font-semibold">
          {badgeNumber}
        </p>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 space-y-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 ${text} transition-all duration-400 ease-custom group-hover:translate-x-48 group-hover:text-white`}
        >
          {Icon ? <Icon size={48} /> : null}
        </div>

        {/* Text content */}
        <div className="transition-all duration-400 ease-custom group-hover:text-white">
          <h1 className="font-bold text-xl group-hover:-translate-y-14 transition-all duration-400 ease-custom">
            {title}
          </h1>
          <p className="text-sm text-zinc-500 leading-6 group-hover:-translate-y-7 group-hover:text-white transition-all duration-400 ease-custom line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};