import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import FullScreenAd from "./components/FullScreenAd";

// 🧩 Admin Pages
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/Dashboard";
import ArticleAdd from "./Admin/ArticleAdd";
import BreakingNewsForm from "./Admin/Breakingform";
import AddAdForm3D from "./Admin/AddAdForm3D";

// 🔹 Layout Component for Admin Pages
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white p-4 text-xl font-semibold">
        Admin Dashboard
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

// 🔒 Protected Route for Admin Access
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

// 🌐 Public Routes
const PublicRoutes: React.FC = () => {
  const location = useLocation();
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const shouldShow = Math.random() < 0.4;
    setShowAd(shouldShow);
  }, [location.pathname]);

  return (
    <>
      {showAd && <FullScreenAd onClose={() => setShowAd(false)} />}
      {!showAd && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />

          {/* Redirect admin base path */}
          <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
        </Routes>
      )}
    </>
  );
};

// 🔹 Admin Routes (Protected)
const AdminRoutes: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/breaking-news" element={<BreakingNewsForm />} />
        <Route path="/ads" element={<AddAdForm3D />} />
        <Route
          path="/article"
          element={
            <ArticleAdd
              title=""
              description=""
              author=""
              category=""
              contentParagraphs={[]}
            />
          }
        />
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </AdminLayout>
  );
};

// 🔹 Combined App Component
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* 🔐 Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 🔐 Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
