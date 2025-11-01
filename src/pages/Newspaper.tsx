import React, { useEffect, useState } from "react";
import pen from "../assets/pen.svg";
import "../fonts/Bamini_Tamil_72.css";
import { useNavigate } from "react-router-dom";

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  categoryColor: string;
  contentParagraphs: string[];
  contentQuote?: string;
  tags: string[];
  mainImage?: string;
  createdAt: string;
}

interface ColumnProps {
  headlineMain: string;
  headlineSub?: string;
  content: React.ReactNode;
  figureImg?: string;
  figCaption?: string;
  citation?: string;
}

const Column: React.FC<ColumnProps> = ({
  headlineMain,
  headlineSub,
  content,
  figureImg,
  figCaption,
  citation,
}) => (
  <div className="p-4 font-[Bamini_Tamil_72]">
    <div className="text-center mb-2">
      <h2 className="font-serif font-extrabold text-lg md:text-xl italic text-gray-900">
        {headlineMain}
      </h2>
      {headlineSub && (
        <h3 className="font-serif font-extrabold text-sm md:text-base mt-1 text-gray-700">
          {headlineSub}
        </h3>
      )}
    </div>

    <div className="text-justify text-sm md:text-base text-gray-800 leading-relaxed font-extrabold">
      {content}
    </div>

    {figureImg && (
      <figure className="my-3">
        <img
          src={figureImg}
          alt={figCaption}
          className="w-full h-40 md:h-48 object-cover rounded-sm"
        />
        {figCaption && (
          <figcaption className="text-xs italic mt-1 text-center font-extrabold">
            {figCaption}
          </figcaption>
        )}
      </figure>
    )}

    {citation && (
      <p className="text-center font-serif font-extrabold text-lg md:text-xl my-4 border-t border-gray-400 pt-2">
        {citation}
      </p>
    )}
  </div>
);

const LoadingTemplate = () => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 md:gap-6 mt-8 animate-pulse">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="flex flex-col justify-between bg-white shadow-sm rounded-md p-3"
      >
        <div className="text-center mb-2">
          <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="h-24 bg-gray-100 rounded my-3"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    ))}
  </div>
);

const Newspaper: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const res = await fetch("http://localhost:3000/articles");
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data: Article[] = await res.json();

        // ✅ Sort by ID (newest first)
        const sortedData = data.sort((a, b) => b.id - a.id);

        // ✅ Show only latest 6
        setArticles(sortedData.slice(0, 6));
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#f9f7f1] font-[Bamini_Tamil_72] min-h-screen p-4 md:p-8">
        <div className="text-center mb-8">
          <header className="flex flex-col items-center justify-start text-center mb-6">
            <div className="flex items-center justify-center gap-4 relative">
              <h1 className="absolute -top-6 left-6 text-blue-700 font-extrabold text-base md:text-lg tracking-wide leading-none">
                வணக்கம்
              </h1>
              <span
                className="text-blue-800 font-extrabold text-5xl md:text-6xl"
                style={{ WebkitTextStroke: "2px #1e3a8a" }}
              >
                சிட்டி
              </span>
              <img src={pen} alt="Logo" className="w-10 md:w-14 h-auto" />
              <span
                className="text-red-700 font-extrabold text-5xl md:text-6xl"
                style={{ WebkitTextStroke: "2px #b91c1c" }}
              >
                எக்ஸ்பிரஸ்
              </span>
            </div>
          </header>
          <div className="uppercase border-t-2 border-b-2 border-gray-800 py-2 text-sm md:text-base tracking-wide">
            செய்திகள் ஏற்றப்படுகிறது...
          </div>
        </div>

        <LoadingTemplate />
      </div>
    );
  }

  return (
    <div className="bg-[#f9f7f1] font-[Bamini_Tamil_72] text-gray-900  p-4 md:p-5">
      {/* 📰 Header */}
      <div className="text-center mb-8">
        <header className="flex flex-col items-center justify-start text-center mb-6">
          <div className="flex items-center justify-center gap-4 relative">
            <h1 className="absolute -top-6 left-6 text-blue-700 font-extrabold text-base md:text-lg tracking-wide leading-none">
              வணக்கம்
            </h1>
            <span
              className="text-blue-800 font-extrabold text-5xl md:text-6xl"
              style={{ WebkitTextStroke: "2px #1e3a8a" }}
            >
              சிட்டி
            </span>
            <img src={pen} alt="Logo" className="w-10 md:w-14 h-auto drop-shadow-lg" />
            <span
              className="text-red-700 font-extrabold text-5xl md:text-6xl"
              style={{ WebkitTextStroke: "2px #b91c1c" }}
            >
              எக்ஸ்பிரஸ்
            </span>
          </div>
        </header>

        <div className="uppercase border-t-2 border-b-2 border-gray-800 py-2 text-sm md:text-base tracking-wide">
          {(() => {
            const now = new Date();
            const optionsDate = {
              day: "numeric",
              month: "long",
              year: "numeric",
            } as const;
            const city = "கோவை";
            const date = now.toLocaleDateString("ta-IN", optionsDate);
            return `${city} - இன்று, ${date} - முழு பக்கம்`;
          })()}
        </div>
      </div>

      {/* 📰 Grid Layout (6 Articles — No Gaps Between News) */}
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-[10px] font-[Bamini_Tamil_72]
  text-justify [text-justify:inter-word] leading-[1.6] tracking-tight text-gray-900"
      >
        {articles.map((article) => (
          <div
            key={article.id}
            onClick={() => navigate(`/article/${article.id}`)}
            className="flex flex-col bg-white border border-gray-300 rounded-sm cursor-pointer 
      hover:bg-gray-100 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
          >
            {/* 🖼️ Image */}
            {article.mainImage && (
              <div className="relative">
                <img
                  src={article.mainImage}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[11px] px-2 py-[3px] font-semibold">
                  {article.category}
                </div>
              </div>
            )}

            {/* 📖 Content */}
            <div className="p-[12px] flex flex-col justify-between flex-1">
              {/* 📰 Title */}
              <h2 className="text-[17px] md:text-[18px] font-extrabold text-gray-900 mb-[6px] leading-tight hover:text-red-600 transition-colors duration-150">
                {article.title}
              </h2>

              {/* 📝 Description */}
              {article.description && (
                <p className="text-[14px] text-gray-800 font-medium leading-snug mb-[5px]">
                  {article.description.length > 150
                    ? article.description.slice(0, 150).trim() + "..."
                    : article.description}
                </p>
              )}
              {/* 💬 Highlight Quote */}
              {article.contentQuote && (
                <blockquote className="border-l-2 border-blue-900 bg-gray-200 italic text-grey-200 px-3 py-2 mt-[6px] text-center text-[13px] rounded-sm">
                  “{article.contentQuote}”
                </blockquote>
              )}

              {/* 📚 Content Paragraphs */}
              {article.contentParagraphs &&
                Array.isArray(article.contentParagraphs) &&
                article.contentParagraphs.length > 0 && (
                  <div className="space-y-[4px] text-[13.8px] text-gray-700 leading-snug">
                    {article.contentParagraphs.slice(0, 1).map((para, i) => {
                      const cleaned = para.replace(/"/g, "").trim();
                      const truncated =
                        cleaned.length > 120
                          ? cleaned.substring(0, 120).trim() + "..."
                          : cleaned;
                      return <p key={i}>{truncated}</p>;
                    })}
                  </div>
                )}


            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Newspaper;
