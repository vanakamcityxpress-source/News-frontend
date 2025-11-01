import { useState, useRef, useEffect } from "react";
import logo from "../assets/cityexpresslogo.svg";
import breakingNewsImg from "../assets/breaking_news.png";

interface BreakingNews {
  id: number;
  video: string;
  heading: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Hero() {
  const [news, setNews] = useState<BreakingNews | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isError, setIsError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Tamil Date & Time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("ta-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("ta-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Fetch breaking news from backend
  useEffect(() => {
    fetch("http://localhost:3000/breaking-news")
      .then((res) => res.json())
      .then((data: BreakingNews[]) => {
        if (data.length > 0) {
          const latestNews = data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )[0];
          setNews(latestNews);
        }
      })
      .catch((err) => {
        console.error("Error fetching breaking news:", err);
        setIsError(true);
      });
  }, []);

  // ✅ Compute proper video URL (Supabase or local)
  const videoUrl = news?.video
    ? news.video.startsWith("http")
      ? news.video
      : `http://localhost:3000/${news.video.replace(/\\/g, "/")}`
    : "";

  // Handle video play
  useEffect(() => {
    if (!videoRef.current || !videoUrl) return;

    videoRef.current.muted = isMuted;

    videoRef.current
      .play()
      .then(() => setIsLoaded(true))
      .catch((err) => {
        console.error("Video playback error:", err);
        setIsError(true);
      });
  }, [videoUrl, isMuted]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <>
      <section className="relative h-[500px] md:h-[600px] overflow-hidden flex flex-col justify-start bg-black">
        {/* Hero Video */}
        {news && videoUrl && !isError ? (
          <video
            ref={videoRef}
            src={videoUrl}
            loop
            muted={isMuted}
            playsInline
            controls
            onCanPlay={() => setIsLoaded(true)}
            onError={(e) => {
              console.error("Video load error", e);
              setIsError(true);
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white text-lg">
            {isError ? "⚠️ Video failed to load" : "Loading video..."}
          </div>
        )}

        {/* Gradient Overlay */}
        {isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        )}

        {/* Breaking News Banner */}
        {news && (
          <div className="absolute top-10 left-0 w-full flex items-center z-30 overflow-hidden">
            <img
              src={breakingNewsImg}
              alt="Breaking News"
              className="h-10 md:h-20 animate-blink mx-2 flex-shrink-0"
            />
            <div className="flex-1 overflow-hidden">
              <div className="whitespace-nowrap inline-block animate-marquee text-white font-bold text-xl md:text-3xl">
                {news.heading}
              </div>
            </div>
          </div>
        )}

        {/* Weather & Date */}
        <div className="absolute bottom-16 right-4 z-40 text-white text-right bg-black/40 px-3 py-2 rounded-lg backdrop-blur-md">
          <p className="text-sm md:text-base">{formattedDate}</p>
          <p className="text-sm md:text-base">{formattedTime}</p>
        </div>

        {/* Logo */}
        <img
          src={logo}
          alt="City Express Logo"
          className="absolute bottom-4 left-4 h-20 md:h-24 z-30"
        />

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-40 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-white/40 transition"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {/* Animations */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 20s linear infinite;
          }
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s infinite;
          }
        `}</style>
      </section>

      {/* Bottom Description Marquee */}
      {news && (
        <div className="w-full overflow-hidden bg-yellow-500 flex items-center py-2 px-4">
          <div className="overflow-hidden flex-1">
            <div className="inline-block animate-marquee whitespace-nowrap">
              <span className="text-white font-bold text-xs md:text-sm mr-6">
                {news.description}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
