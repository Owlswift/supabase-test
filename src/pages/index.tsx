"use client";

import { useAuth } from "@/lib/hooks/useAuth";

export default function Home() {
  const { email, setEmail, password, setPassword, loading, error, handleAuth } =
    useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Supabase Auth Test
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500 text-gray-800"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500 text-gray-800"
            required
          />

          <div className="flex gap-4">
            <button
              type="submit"
              onClick={(e) => handleAuth(e, false)}
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <button
              type="submit"
              onClick={(e) => handleAuth(e, true)}
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
