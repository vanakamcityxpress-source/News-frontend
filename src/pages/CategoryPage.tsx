import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarAds from "../components/Sidebar";

interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  category: string;
  mainImage?: string;
  createdAt?: string;
}

export default function CategoryPage() {
  const { category } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Scroll to top on category change
    setLoading(true);

    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => {
        // ✅ Filter articles by category & sort newest first
        const filtered = data
          .filter((a: Article) => a.category === category)
          .sort(
            (a: Article, b: Article) =>
              new Date(b.createdAt || "").getTime() -
              new Date(a.createdAt || "").getTime()
          );
        setArticles(filtered);
      })
      .catch((err) => console.error("Error fetching articles:", err))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#F9F7F1] min-h-screen font-[Bamini_Tamil_72]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {/* 📰 Main Article Section - Reduced width */}
        <section className="lg:col-span-2 xl:col-span-3">
          <h1 className="text-3xl font-extrabold text-[#E60000] mb-6 border-b-4 border-[#E60000] inline-block capitalize">
            {category}
          </h1>

          {articles.length === 0 ? (
            <p className="text-gray-700 mt-8 text-lg">
              இந்த பிரிவில் செய்திகள் இல்லை.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/article/${article.id}`)} // ✅ Uses ID instead of slug
                  className="group bg-white rounded-lg border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {article.mainImage && (
                    <img
                      src={article.mainImage}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-700 line-clamp-3 mb-2">
                      {article.description}
                    </p>
                    <span className="text-[#E60000] font-semibold text-sm mt-2 inline-block group-hover:underline">
                      மேலும் வாசிக்க →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 🎯 Sidebar Ads - Increased width */}
        <aside className="lg:col-span-2 sticky top-24 h-fit space-y-6">
          <SidebarAds />
        </aside>
      </main>

      <Footer />
    </div>
  );
}
