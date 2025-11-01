import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (username: string) => void;
}

export default function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [isTamil, setIsTamil] = useState(true); // 🌐 Language toggle

  // ✅ Check if user already logged in on reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.username) {
        setLoggedInUser(parsedUser.username);
        onLogin(parsedUser.username);
      }
    }
  }, [onLogin]);

  // 🔹 Handle Signup / Login
  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "http://localhost:3000/auth/login"
        : "http://localhost:3000/auth/signup";

      const body = isLogin ? { email, password } : { username, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            (isLogin
              ? isTamil
                ? "உள்நுழைவு தோல்வியடைந்தது"
                : "Login failed"
              : isTamil
              ? "பதிவு தோல்வியடைந்தது"
              : "Signup failed")
        );
      }

      // ✅ Save login details
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setLoggedInUser(data.user.username);
      onLogin(data.user.username);
      onClose();
    } catch (err: any) {
      setError(err.message || (isTamil ? "ஏதோ தவறு நடந்துள்ளது" : "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedInUser(null);
  };

  // ✅ If logged in → show username + logout button
  if (loggedInUser) {
    return (
      <div className="fixed top-4 right-4 bg-white shadow-lg rounded-xl px-4 py-2 flex items-center gap-3 border border-gray-200">
        <span className="text-gray-800 font-medium">
          {isTamil ? `வணக்கம், ${loggedInUser} 👋` : `Hello, ${loggedInUser} 👋`}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
        >
          {isTamil ? "வெளியேறு" : "Logout"}
        </button>
        {/* 🌐 Language Toggle */}
        <button
          onClick={() => setIsTamil(!isTamil)}
          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm hover:bg-gray-300"
        >
          {isTamil ? "English" : "தமிழ்"}
        </button>
      </div>
    );
  }

  // ✅ Default login / signup modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label={isTamil ? "மூடு" : "Close"}
        >
          <X size={22} />
        </button>

        {/* 🌐 Language Toggle */}
        <button
          onClick={() => setIsTamil(!isTamil)}
          className="absolute top-3 left-3 bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-200"
        >
          {isTamil ? "English" : "தமிழ்"}
        </button>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-5">
          <button
            onClick={() => setIsLogin(true)}
            disabled={loading}
            className={`px-4 py-2 rounded-l-full font-medium transition-all ${
              isLogin
                ? "bg-[#006ABA] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {isTamil ? "உள்நுழை" : "Login"}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            disabled={loading}
            className={`px-4 py-2 rounded-r-full font-medium transition-all ${
              !isLogin
                ? "bg-[#006ABA] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {isTamil ? "பதிவு" : "Signup"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) handleSubmit();
          }}
          className="space-y-4"
        >
          {!isLogin && (
            <input
              type="text"
              placeholder={isTamil ? "பயனர்பெயர்" : "Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#006ABA]"
              required
            />
          )}
          <input
            type="email"
            placeholder={isTamil ? "மின்னஞ்சல் முகவரி" : "Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#006ABA]"
            required
          />
          <input
            type="password"
            placeholder={isTamil ? "கடவுச்சொல்" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#006ABA]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#006ABA] text-white py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading
              ? isTamil
                ? "ஏற்றுகிறது..."
                : "Loading..."
              : isLogin
              ? isTamil
                ? "உள்நுழை"
                : "Login"
              : isTamil
              ? "பதிவு செய்யவும்"
              : "Signup"}
          </button>
        </form>

        {/* Switch text */}
        {isLogin && (
          <p className="text-sm text-center mt-4 text-gray-600">
            {isTamil ? "கணக்கு இல்லையா?" : "Don’t have an account?"}{" "}
            <span
              onClick={() => setIsLogin(false)}
              className="text-[#006ABA] cursor-pointer font-medium hover:underline"
            >
              {isTamil ? "பதிவு செய்யவும்" : "Sign up"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
