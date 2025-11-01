import React, { useState } from "react";

export default function BreakingNewsForm3D() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heading || !description || !video) {
      alert("Please complete all fields and upload a video before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("description", description);
      formData.append("video", video);

      const res = await fetch("http://localhost:3000/breaking-news", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit breaking news");

      const data = await res.json();
      console.log("Breaking news submitted:", data);
      alert("Breaking news has been successfully submitted!");
      setHeading("");
      setDescription("");
      setVideo(null);
    } catch (err) {
      console.error(err);
      alert("Error submitting breaking news. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-10 space-y-8 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 hover:shadow-3xl">
        <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-center mb-6">
          Submit Breaking News
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Heading */}
          <input
            type="text"
            placeholder="Enter the news headline"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full border border-gray-300 px-5 py-4 rounded-2xl shadow-md hover:shadow-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300 bg-white"
          />

          {/* Description */}
          <textarea
            placeholder="Write a brief summary of the news"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 px-5 py-4 rounded-2xl shadow-md hover:shadow-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300 bg-white"
            rows={4}
          />

          {/* Video Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Attach Video (optional)</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files ? e.target.files[0] : null)}
              className="w-full rounded-2xl border border-gray-300 px-3 py-2 shadow-md hover:shadow-xl transition-all duration-300 bg-white"
            />
            {video && (
              <video
                src={URL.createObjectURL(video)}
                className="mt-2 rounded-xl shadow-lg"
                controls
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-white px-6 py-4 rounded-2xl text-lg font-bold hover:scale-105 transform transition-all duration-300 shadow-lg"
          >
            Submit News
          </button>
        </form>
      </div>
    </div>
  );
}