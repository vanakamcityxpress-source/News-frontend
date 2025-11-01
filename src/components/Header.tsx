import { Search, Menu, X, User } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cityexpresslogo.svg";
import AuthModal from "./AuthModal";

interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  category: string;
  mainImage?: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [user, setUser] = useState<string | null>(null);

  const [language, setLanguage] = useState(localStorage.getItem("language") || "ta");

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));

    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "ta" ? "en" : "ta";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  // ✅ Translate English → Tamil for redirects
  const translateToTamil = (enCategory: string) => {
    const mapping: Record<string, string> = {
      "State News": "மாநில செய்திகள்",
      "National News": "தேசிய செய்திகள்",
      "World News": "உலக செய்திகள்",
      "Sports": "விளையாட்டு செய்திகள்",
      "Cinema": "சினிமா",
      "Technology": "தொழில்நுட்பம்",
      "Environment": "சுற்றுச்சூழல்",
      "Innovation": "புதுமை",
      "Business": "வணிகம்",
    };
    return mapping[enCategory] || enCategory;
  };

  const categories = useMemo(() => {
    const tamilBase = [
      "மாநில செய்திகள்",
      "தேசிய செய்திகள்",
      "உலக செய்திகள்",
      "விளையாட்டு செய்திகள்",
      "சினிமா",
      "தொழில்நுட்பம்",
      "சுற்றுச்சூழல்",
      "புதுமை",
      "வணிகம்",
    ];

    const englishBase = [
      "State News",
      "National News",
      "World News",
      "Sports",
      "Cinema",
      "Technology",
      "Environment",
      "Innovation",
      "Business",
    ];

    const apiCategories = Array.from(
      new Set(
        articles
          .map((a) => {
            if (!a.category) return null;
            return a.category.split(",")[0].trim();
          })
          .filter(Boolean)
      )
    );

    const combined = [...apiCategories];
    const base = language === "ta" ? tamilBase : englishBase;

    for (const cat of base) {
      if (!combined.includes(cat)) combined.push(cat);
    }

    return combined;
  }, [articles, language]);

  const t = (ta: string, en: string) => (language === "ta" ? ta : en);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* 🔹 Breaking News Marquee */}
      <div className="bg-blue-900 text-white text-sm py-1 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee px-4">
          {articles[0]?.title ||
            t("சமீபத்திய செய்திகள் இங்கே புதுப்பிக்கப்படுகின்றன...", "Latest updates will appear here...")}
        </div>
      </div>

      {/* 🔹 Main Header */}
      <div className="bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Vanakkam City Xpress" className="w-32 h-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-800 hover:text-[#006ABA] font-medium">
                {t("முகப்பு", "Home")}
              </Link>

              {categories.slice(0, 6).map((cat, i) => (
                <Link
                  key={i}
                  to={`/category/${encodeURIComponent(
                    language === "ta" ? cat : translateToTamil(cat)
                  )}`}
                  className="text-gray-800 hover:text-[#006ABA] font-medium"
                >
                  {cat}
                </Link>
              ))}

              {categories.length > 6 && (
                <div className="relative">
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className="flex items-center text-gray-800 hover:text-[#006ABA] font-medium"
                  >
                    {t("மேலும்", "More")}
                    <svg
                      className={`ml-1 transform transition-transform ${isMoreOpen ? "rotate-180" : ""}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      height="1em"
                      width="1em"
                    >
                      <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                    </svg>
                  </button>

                  {isMoreOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      {categories.slice(6).map((cat, i) => (
                        <Link
                          key={i}
                          to={`/category/${encodeURIComponent(
                            language === "ta" ? cat : translateToTamil(cat)
                          )}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </nav>

            {/* Auth & Search */}
            <div className="flex items-center space-x-3">
              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300"
              >
                {language === "ta" ? "EN" : "தமிழ்"}
              </button>

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-800 hover:text-[#006ABA]"
              >
                <Search size={20} />
              </button>

              {user ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                  }}
                  className="px-3 py-1.5 bg-red-500 text-white rounded-full text-sm"
                >
                  {t("வெளியேறு", "Logout")}
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#006ABA] text-white rounded-full hover:bg-blue-700 text-sm"
                >
                  <User size={16} />
                  <span>{t("உள்நுழை", "Login")}</span>
                </button>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-800 md:hidden"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-3">
              <input
                type="text"
                placeholder={t("கட்டுரைகளை தேடு...", "Search articles...")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#006ABA]"
              />
            </div>
          )}
        </div>
      </div>

      {/* 🔹 News Type Bar */}
      <div className="bg-gray-900 text-gray-200 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 overflow-x-auto whitespace-nowrap">
          {(language === "ta"
            ? [
                "மாநில செய்திகள்",
                "தேசிய செய்திகள்",
                "உலக செய்திகள்",
                "விளையாட்டு செய்திகள்",
                "சினிமா",
                "தொழில்நுட்பம்",
                "சுற்றுச்சூழல்",
                "புதுமை",
                "வணிகம்",
              ]
            : [
                "State News",
                "National News",
                "World News",
                "Sports",
                "Cinema",
                "Technology",
                "Environment",
                "Innovation",
                "Business",
              ]
          ).map((news, index) => (
            <span key={index}>
              <Link
                to={`/category/${encodeURIComponent(
                  language === "ta" ? news : translateToTamil(news)
                )}`}
                className="text-gray-300 hover:text-[#FFD700] transition-colors px-2"
              >
                {news}
              </Link>
              {index < 8 && <span className="text-gray-500"> | </span>}
            </span>
          ))}
        </div>
      </div>

      {/* 🔹 Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col p-4 space-y-2">
            <Link to="/" className="text-gray-700 hover:text-[#006ABA] font-medium">
              {t("முகப்பு", "Home")}
            </Link>
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/category/${encodeURIComponent(
                  language === "ta" ? cat : translateToTamil(cat)
                )}`}
                className="text-gray-700 hover:text-[#006ABA] font-medium"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      {isAuthOpen && (
  <AuthModal
    onClose={() => setIsAuthOpen(false)}
    onLogin={(username: string) => {
      setUser(username);
      localStorage.setItem("user", username);
    }}
  />
)}

    </header>
  );
}
