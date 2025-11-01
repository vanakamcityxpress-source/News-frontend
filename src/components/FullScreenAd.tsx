import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface FullScreenAdProps {
  onClose: () => void;
}

interface Ad {
  id: number;
  title: string;
  description?: string;
  image: string;
  link?: string;
  isActive: boolean;
}

const FullScreenAd: React.FC<FullScreenAdProps> = ({ onClose }) => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [visible, setVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);

  // 🧠 Fetch ads from backend
  useEffect(() => {
    fetch("http://localhost:3000/ads")
      .then((res) => res.json())
      .then((data: Ad[]) => {
        const activeAds = data.filter((a) => a.isActive);
        if (activeAds.length > 0) {
          const randomAd =
            activeAds[Math.floor(Math.random() * activeAds.length)];
          setAd(randomAd);
        }
      })
      .catch((err) => console.error("Error fetching ads:", err));
  }, []);

  // ⏳ Skip countdown
  useEffect(() => {
    if (secondsLeft <= 0) {
      setCanSkip(true);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  // ⏰ Auto-close after 10s
  useEffect(() => {
    const autoClose = setTimeout(() => handleClose(), 10000);
    return () => clearTimeout(autoClose);
  }, []);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  if (!visible || !ad) return null;

  const isVideo = ad.image.toLowerCase().endsWith(".mp4");

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      {/* Background media */}
      {isVideo ? (
        <video
          src={ad.image}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
      ) : (
        <img
          src={ad.image}
          alt="Ad Background"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
      )}

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition"
        aria-label="Close ad"
      >
        <X size={24} />
      </button>

      {/* Centered content */}
      <div className="relative z-10 text-center text-white px-8 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
          {ad.title}
        </h1>
        {ad.description && (
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {ad.description}
          </p>
        )}

        <button
          onClick={handleClose}
          disabled={!canSkip}
          className={`px-8 py-3 rounded-full font-semibold transition 
            ${
              canSkip
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-gray-500/50 text-gray-300 cursor-not-allowed"
            }`}
        >
          {canSkip ? "Skip Ad" : `Skip in ${secondsLeft}s`}
        </button>
      </div>
    </div>
  );
};

export default FullScreenAd;
