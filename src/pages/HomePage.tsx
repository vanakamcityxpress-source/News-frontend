import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Newspaper from "./Newspaper";

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryColor?: string;
  slug: string;
  mainImage?: string;
  createdAt: string;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  // ✅ Fetch articles from backend API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:3000/articles");
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data: Article[] = await res.json();

        // ✅ Sort by createdAt (latest first), fallback to id
        const sorted = data.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime() || 0;
          const dateB = new Date(b.createdAt).getTime() || 0;

          if (dateB !== dateA) return dateB - dateA;
          return b.id - a.id; // fallback if date missing or same
        });

        // ✅ Only latest 6 (optional)
        setArticles(sorted.slice(0, 6));
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F4F4] font-[Bamini_Tamil_72]">
      <Header />
      <Hero />
      <Newspaper />

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ✅ Articles Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                சமீபத்திய செய்திகள்
              </h2>
              <div className="w-20 h-1 bg-[#E60000]"></div>
            </div>

            {/* ✅ Latest Article Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/article/${article.id}`)}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <ArticleCard
                    image={article.mainImage}
                    category={article.category}
                    title={article.title}
                    description={article.description}
                    categoryColor={article.categoryColor || "#E60000"}
                    className="h-[280px] md:h-[260px]" // 👈 smaller ad size
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Sidebar Section */}
          <div className="lg:col-span-1 mt-10 lg:mt-[80px]">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
