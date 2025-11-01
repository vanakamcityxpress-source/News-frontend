import React from "react";

interface InlineAdProps {
  image: string;
  title: string;
  link?: string;
  size?: "small" | "large";
}

const InlineAd: React.FC<InlineAdProps> = ({ image, title, link = "#", size = "large" }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-xl overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-2xl ${
        size === "small" ? "w-56 h-72" : "w-full"
      }`}
    >
      <img
        src={image}
        alt={title}
        className={`object-cover ${size === "small" ? "h-48 w-full" : "h-64 w-full"}`}
      />
      <div className="bg-gray-900 text-white text-center p-3 font-medium text-sm">
        {title}
      </div>
    </a>
  );
};

export default InlineAd;
