import React, { useEffect, useState, useRef } from "react";

export default function SidebarAds() {
  const [ads, setAds] = useState<any[]>([]);
  const [visible, setVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/ads")
      .then((res) => res.json())
      .then((data) => {
        const activeAds = data.filter((ad: any) => ad.isActive);
        setAds(activeAds);
      })
      .catch((err) => console.error("Error fetching ads:", err));
  }, []);

  const imageAds = ads.filter(
    (ad) => ad.image && !ad.image.toLowerCase().endsWith(".mp4") && ad.isActive
  );
  const videoAds = ads.filter(
    (ad) => ad.image && ad.image.toLowerCase().endsWith(".mp4") && ad.isActive
  );

  const floatingAd = videoAds.length > 0 ? videoAds[0] : null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipAd = () => {
    if (videoRef.current) videoRef.current.pause();
    setVisible(false);
  };

  return (
    <>
      {/* 🧱 Sidebar Grid Ads */}
      <aside className="grid grid-cols-2 gap-3">
        {imageAds.map((ad) => (
          <a
            key={ad.id}
            href={ad.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow overflow-hidden"
          >
            <div className="w-full h-32 overflow-hidden rounded-t-md">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <span className="text-gray-900 text-sm font-medium p-2">
              {ad.title}
            </span>
          </a>
        ))}

        {imageAds.length === 0 && (
          <p className="text-gray-500 text-center col-span-2">
            தற்போது எந்த விளம்பரமும் இல்லை.
          </p>
        )}
      </aside>

      {/* 🎬 Draggable Floating Video Ad */}
      {visible && floatingAd && (
        <DraggableAd
          floatingAd={floatingAd}
          onClose={skipAd}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
        />
      )}
    </>
  );
}

/* ------------------------ 🧩 DraggableAd Component ------------------------ */
const DraggableAd = ({ floatingAd, onClose, isPlaying, togglePlay }: any) => {
  const adRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const position = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0, dragging: false });

  useEffect(() => {
    const adEl = adRef.current;
    if (!adEl) return;

    const onDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      position.current.dragging = true;

      const rect = adEl.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      position.current.offsetX = clientX - rect.left;
      position.current.offsetY = clientY - rect.top;

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onUp);
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!position.current.dragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const elWidth = adEl.offsetWidth;
      const elHeight = adEl.offsetHeight;

      let x = clientX - position.current.offsetX;
      let y = clientY - position.current.offsetY;

      // 🧱 Boundaries
      x = Math.max(0, Math.min(x, width - elWidth));
      y = Math.max(0, Math.min(y, height - elHeight));

      position.current.x = x;
      position.current.y = y;

      adEl.style.left = `${x}px`;
      adEl.style.top = `${y}px`;
      adEl.style.right = "auto";
      adEl.style.bottom = "auto";
      adEl.style.position = "fixed";
    };

    const onUp = () => {
      position.current.dragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
    };

    adEl.addEventListener("mousedown", onDown);
    adEl.addEventListener("touchstart", onDown);

    return () => {
      adEl.removeEventListener("mousedown", onDown);
      adEl.removeEventListener("touchstart", onDown);
    };
  }, []);

  return (
    <div
      ref={adRef}
      className="fixed bottom-4 right-4 w-[260px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 cursor-move z-[9999]"
      style={{ touchAction: "none" }}
    >
      {/* ✖ Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black transition"
      >
        ✖
      </button>

      {/* 🎥 Video */}
      <video
        ref={videoRef}
        src={floatingAd.image}
        autoPlay
        muted
        loop
        playsInline
        onClick={togglePlay}
        className="w-full h-[180px] object-cover cursor-pointer"
      />

      {/* ▶️ Pause/Play Button */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-between px-3">
        <button
          onClick={togglePlay}
          className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full hover:bg-black transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};
