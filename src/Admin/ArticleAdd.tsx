import React, { useState } from "react";

const colorOptions = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#007AFF",
  "#AF52DE",
  "#FF2D55",
];

export default function CreateOrUpdateArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [categoryColor, setCategoryColor] = useState(colorOptions[0]);
  const [contentParagraphs, setContentParagraphs] = useState<string[]>([""]);
  const [contentQuote, setContentQuote] = useState("");
  const [tags, setTags] = useState<string[]>([""]);
  const [file, setFile] = useState<File | null>(null);
  const [updateId, setUpdateId] = useState("");

  const handleParagraphChange = (i: number, value: string) => {
    const updated = [...contentParagraphs];
    updated[i] = value;
    setContentParagraphs(updated);
  };
  const addParagraph = () => setContentParagraphs([...contentParagraphs, ""]);

  const handleTagChange = (i: number, value: string) => {
    const updated = [...tags];
    updated[i] = value;
    setTags(updated);
  };
  const addTag = () => setTags([...tags, ""]);

  const buildFormData = () => {
    const formData = new FormData();
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (author) formData.append("author", author);
    if (category) formData.append("category", category);
    if (categoryColor) formData.append("categoryColor", categoryColor);
    contentParagraphs.forEach((p, idx) => formData.append(`contentParagraphs[${idx}]`, p));
    if (contentQuote) formData.append("contentQuote", contentQuote);
    tags.forEach((t, idx) => formData.append(`tags[${idx}]`, t));
    if (file) formData.append("file", file);
    return formData;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = buildFormData();
      const res = await fetch("http://localhost:3000/articles/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("✅ Created:", data);
      alert("Article created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating article");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateId) return alert("Enter Article ID to update!");
    try {
      const formData = buildFormData();
      const res = await fetch(`http://localhost:3000/articles/${updateId}`, {
        method: "PATCH",
        body: formData,
      });
      const data = await res.json();
      console.log("✅ Updated:", data);
      alert("Article updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating article");
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateId) return alert("Enter Article ID to delete!");
    if (!window.confirm(`Are you sure you want to delete article ID ${updateId}?`)) return;
    try {
      const res = await fetch(`http://localhost:3000/articles/${updateId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      alert("Article deleted successfully!");
      setUpdateId("");
    } catch (err) {
      console.error(err);
      alert("Error deleting article");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
          📰 Create / Update Article
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none transition-all"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none transition-all"
            rows={2}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  style={{ backgroundColor: color }}
                  onClick={() => setCategoryColor(color)}
                  className={`w-7 h-7 rounded-full border-2 ${categoryColor === color ? "border-black scale-110" : "border-transparent"} transition-transform`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold">Paragraphs</label>
            {contentParagraphs.map((p, i) => (
              <textarea
                key={i}
                value={p}
                onChange={(e) => handleParagraphChange(i, e.target.value)}
                placeholder={`Paragraph ${i + 1}`}
                className="w-full border border-gray-300 px-3 py-2 rounded-xl my-1 shadow-sm focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all"
                rows={2}
              />
            ))}
            <button type="button" onClick={addParagraph} className="text-purple-600 font-semibold hover:underline">
              + Add Paragraph
            </button>
          </div>

          <textarea
            placeholder="Quote"
            value={contentQuote}
            onChange={(e) => setContentQuote(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all"
            rows={2}
          />

          <div>
            <label className="font-semibold">Tags</label>
            {tags.map((t, i) => (
              <input
                key={i}
                value={t}
                onChange={(e) => handleTagChange(i, e.target.value)}
                placeholder={`Tag ${i + 1}`}
                className="w-full border border-gray-300 px-3 py-2 rounded-xl my-1 shadow-sm focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all"
              />
            ))}
            <button type="button" onClick={addTag} className="text-purple-600 font-semibold hover:underline">
              + Add Tag
            </button>
          </div>

          <div>
            <label className="block font-semibold">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="w-full border border-gray-300 px-3 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <button onClick={handleCreate} className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all flex-1">
              Create
            </button>
            <input
              type="number"
              placeholder="Article ID"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 flex-1"
            />
            <button onClick={handleUpdate} className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all flex-1">
              Update
            </button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all flex-1">
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
