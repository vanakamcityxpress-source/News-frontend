import React, { useState } from "react";

export default function AddAdForm3D() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  // 🔧 Helper: Build FormData
  const buildFormData = () => {
    const formData = new FormData();
    if (title) formData.append("title", title);
    if (link) formData.append("link", link);
    if (image) formData.append("image", image);
    if (startTime) formData.append("startTime", startTime);
    if (endTime) formData.append("endTime", endTime);
    return formData;
  };

  // 🟢 CREATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Please fill in the required fields: Title and Image.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/ads", {
        method: "POST",
        body: buildFormData(),
      });

      if (!res.ok) throw new Error("Failed to submit ad");

      const data = await res.json();
      console.log("✅ Ad created:", data);
      alert("Ad has been successfully submitted!");

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error submitting ad. Check console for details.");
    }
  };

  // 🔵 UPDATE
  const handleUpdate = async () => {
    if (!updateId) return alert("Please enter an Ad ID to update!");

    try {
      const res = await fetch(`http://localhost:3000/ads/${updateId}`, {
        method: "PUT",
        body: buildFormData(),
      });

      if (!res.ok) throw new Error("Failed to update ad");

      const data = await res.json();
      console.log("✅ Ad updated:", data);
      alert("Ad updated successfully!");

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error updating ad. Check console for details.");
    }
  };

  // 🔴 DELETE
  const handleDelete = async () => {
    if (!deleteId) return alert("Please enter an Ad ID to delete!");

    if (!window.confirm(`Are you sure you want to delete Ad ID ${deleteId}?`))
      return;

    try {
      const res = await fetch(`http://localhost:3000/ads/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete ad");

      const data = await res.json();
      console.log("🗑️ Ad deleted:", data);
      alert(`Ad ID ${deleteId} deleted successfully!`);

      setDeleteId("");
    } catch (err) {
      console.error(err);
      alert("Error deleting ad. Check console for details.");
    }
  };

  // 🧼 Reset form fields
  const resetForm = () => {
    setTitle("");
    setLink("");
    setImage(null);
    setStartTime("");
    setEndTime("");
    setUpdateId("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-10 space-y-8 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 hover:shadow-3xl">
        <h2 className="text-4xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 mb-6">
          📰 Manage Advertisements
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            placeholder="Enter ad title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-5 py-4 rounded-2xl shadow-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all bg-white"
          />

          {/* Link */}
          <input
            type="text"
            placeholder="Enter target URL (optional)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border border-gray-300 px-5 py-4 rounded-2xl shadow-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all bg-white"
          />

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">
              Upload Ad Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              className="w-full rounded-2xl border border-gray-300 px-3 py-2 shadow-md bg-white"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-2 rounded-xl shadow-lg max-h-60 object-contain"
              />
            )}
          </div>

          {/* Start Time */}
          <div>
            <label className="font-semibold text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-2xl shadow-md focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="font-semibold text-gray-700">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-2xl shadow-md focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
            />
          </div>

          {/* 🟢 Create Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-lg"
          >
            Create New Advertisement
          </button>
        </form>

        {/* 🔵 Update / 🔴 Delete Controls */}
        <div className="space-y-6 pt-8 border-t border-gray-200">
          {/* Update Section */}
          <div className="flex gap-3 items-center">
            <input
              type="number"
              placeholder="Enter Ad ID to update"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
              className="border border-gray-300 rounded-2xl px-4 py-3 flex-1"
            />
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all"
            >
              Update by ID
            </button>
          </div>

          {/* Delete Section */}
          <div className="flex gap-3 items-center">
            <input
              type="number"
              placeholder="Enter Ad ID to delete"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              className="border border-gray-300 rounded-2xl px-4 py-3 flex-1"
            />
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all"
            >
              Delete by ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
