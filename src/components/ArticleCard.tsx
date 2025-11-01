import React from "react";

interface ArticleCardProps {
  image?: string;
  category: string;
  title: string;
  description: string;
  categoryColor?: string;
}

export default function ArticleCard({
  image,
  category,
  title,
  description,
  categoryColor = "#006ABA",
}: ArticleCardProps) {
  const bgColorStyle = { backgroundColor: categoryColor };

  return (
    <article className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 font-[Bamini_Tamil_72]">
      {/* 🖼️ Image Section */}
      <div className="relative overflow-hidden h-48">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            படம் இல்லை
          </div>
        )}

        {/* 🏷️ Category Label */}
        <div
          className="absolute top-4 left-4 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-sm shadow-md"
          style={bgColorStyle}
        >
          {category}
        </div>
      </div>

      {/* 📰 Content Section */}
      <div className="p-5 flex flex-col justify-between h-48">
        {/* Heading: max 3 lines */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#006ABA] transition-colors duration-200 line-clamp-3">
          {title}
        </h3>

        {/* Description: max 3 lines, truncated */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {description}
        </p>
      </div>
    </article>
  );
}
