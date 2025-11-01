import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarAds from "../components/Sidebar";

interface Article {
  mainImage?: string;
  id: number;
  title: string;
  category: string;
  description: string;
  image?: string;
  slug: string;
  createdAt: string;
  contentParagraphs?: string[];
  contentQuote?: string;
  tags?: string[];
}

interface Comment {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
}

interface Ad {
  id: number;
  title: string;
  image: string;
  link: string;
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [randomAd, setRandomAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  // 💬 Comment-related state
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  // 📰 Fetch Article by Slug
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:3000/articles/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch article");
        const data = await res.json();
        setArticle(data.article || data);
      } catch (err) {
        console.error("❌ Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchArticle();
  }, [slug]);

  // 💬 Fetch Comments for this Article
  useEffect(() => {
    if (!article?.id) return;
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/comments/${article.id}`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("❌ Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [article?.id]);

  // 🎯 Fetch Ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("http://localhost:3000/ads");
        if (!res.ok) throw new Error("Failed to fetch ads");
        const data = await res.json();
        setAds(data);
        const random = data[Math.floor(Math.random() * data.length)];
        setRandomAd(random);
      } catch (err) {
        console.error("❌ Error fetching ads:", err);
      }
    };
    fetchAds();
  }, []);

  // 📝 Submit New Comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim() || !article?.id) return;

    setCommentLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/comments/${article.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment: commentText }),
      });

      if (!res.ok) throw new Error("Failed to submit comment");
      const newComment = await res.json();

      setComments((prev) => [...prev, newComment]); // instantly add to list
      setName("");
      setCommentText("");
    } catch (err) {
      console.error("❌ Error submitting comment:", err);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg font-[Bamini_Tamil_72]">
        லோடாகிறது...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg font-[Bamini_Tamil_72]">
        கட்டுரை கிடைக்கவில்லை.
      </div>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleString("ta-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen bg-[#F4F4F4] font-[Bamini_Tamil_72]">
      <Header />

      {/* 📰 Main Article Section */}
      <main className="relative max-w-[1600px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* 📄 Left - Article */}
        <div className="flex-[2] bg-white rounded-lg shadow-md p-8">
          {article.mainImage && (
            <div className="mb-6">
              <img
                src={article.mainImage}
                alt={article.title}
                className="rounded-md w-full max-h-[480px] object-cover"
              />
            </div>
          )}

          <div className="text-sm text-gray-500 mb-2">
            <span className="text-[#E60000] font-bold">
              » செய்திகள் - {article.category} »
            </span>{" "}
          </div>

          <h1 className="text-3xl font-bold text-[#003366] mb-3 leading-snug">
            {article.title}
          </h1>

          <div className="text-sm text-[#E60000] mb-4">
            வெளியானது:{" "}
            <span className="text-blue-600 font-semibold">{formattedDate}</span>
          </div>

          <div className="mb-6">
            <button
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                  "_blank"
                )
              }
              className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-800 transition"
            >
              பகிர்
            </button>
          </div>

          {article.image && (
            <div className="mb-6">
              <img
                src={article.image}
                alt={article.title}
                className="rounded-md w-full max-h-[450px] object-cover"
              />
            </div>
          )}

          <div className="text-[17px] text-gray-800 leading-relaxed whitespace-pre-line mb-6">
            {article.description}
          </div>

          {article.contentParagraphs?.length ? (
            <div className="space-y-4 text-[17px] text-gray-800 leading-relaxed">
              {article.contentParagraphs.map((para, i) => (
                <p key={i}>{para.replace(/"/g, "")}</p>
              ))}
            </div>
          ) : null}

          {article.contentQuote && (
            <blockquote className="border-l-4 border-blue-500 bg-blue-50 italic text-gray-700 p-4 my-6 rounded-md">
              “{article.contentQuote}”
            </blockquote>
          )}

          {article.tags?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}

          {/* 💬 Comments Section */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-[#003366] mb-4">
              மக்கள் கருத்து
            </h2>

            <div className="bg-yellow-100 border border-yellow-300 text-gray-800 text-sm p-4 rounded-md mb-6 leading-relaxed">
              மக்கள் பதிவு செய்யும் கருத்துகள் தனிநபர்களின் பிரசாரமாகும். பொறுப்பு
              எங்கள் வலைத்தளத்துக்கு இல்லை. தேவையற்ற அல்லது அவமதிப்பு கருத்துகள்
              நீக்கப்படும்.
            </div>

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">பெயர்:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="உங்கள் பெயரை எழுதவும்"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  கருத்து:
                </label>
                <textarea
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="உங்கள் கருத்தை இங்கே எழுதவும்"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={commentLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm disabled:opacity-60"
              >
                {commentLoading ? "சேமிக்கிறது..." : "பதிவு செய்க"}
              </button>
            </form>

            {/* 🗨️ Show Comments */}
            {comments.length > 0 && (
              <div className="mt-6 space-y-4">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="border border-gray-200 rounded-md p-3 bg-gray-50"
                  >
                    <p className="font-semibold text-gray-900">{c.name}</p>
                    <p className="text-gray-800 text-sm mt-1">{c.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(c.createdAt).toLocaleString("ta-IN")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* 🎯 Sidebar Ads */}
        <aside className="hidden lg:block flex-[0.6] relative">
          <div className="lg:sticky lg:top-20">
            <SidebarAds />
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
