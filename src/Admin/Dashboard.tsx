import React from "react";
import { FaNewspaper, FaBolt, FaAd, FaCog } from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold text-gray-800">Admin Panel</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li className="hover:bg-gray-200 transition-colors rounded-md">
              <a href="/admin/articles" className="flex items-center gap-3 p-4 text-gray-700">
                <FaNewspaper /> Articles
              </a>
            </li>
            <li className="hover:bg-gray-200 transition-colors rounded-md">
              <a href="/admin/breaking-news" className="flex items-center gap-3 p-4 text-gray-700">
                <FaBolt /> Breaking News
              </a>
            </li>
            <li className="hover:bg-gray-200 transition-colors rounded-md">
              <a href="/admin/ads" className="flex items-center gap-3 p-4 text-gray-700">
                <FaAd /> Ads
              </a>
            </li>
            <li className="hover:bg-gray-200 transition-colors rounded-md">
              <a href="/admin/settings" className="flex items-center gap-3 p-4 text-gray-700">
                <FaCog /> Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Total Articles</h2>
            <p className="text-2xl font-bold text-gray-900">128</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Breaking News</h2>
            <p className="text-2xl font-bold text-gray-900">5</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Active Ads</h2>
            <p className="text-2xl font-bold text-gray-900">16</p>
          </div>
        </div>

        {/* Latest Articles Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">1</td>
                <td className="px-6 py-4 whitespace-nowrap">Diwali Offer</td>
                <td className="px-6 py-4 whitespace-nowrap">Festival</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">Published</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
              {/* More rows here */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
