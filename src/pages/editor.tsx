"use client";

import Navbar from "@/components/navbar";
import { usePageEditor } from "@/lib/hooks/usePageEditor";
import Link from "next/link";

export default function Editor() {
  const {
    user,
    username,
    setUsername,
    title,
    setTitle,
    content,
    setContent,
    loading,
    handleSignOut,
    handlePublish,
  } = usePageEditor();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-6">
              Please sign in to access the editor.
            </p>
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-700 transition font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar user={user} onSignOut={handleSignOut} title="Page Editor" />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/60">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username for your page URL *
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 bg-gray-100 px-3 py-2 rounded-l-lg border border-r-0 border-gray-300">
                mysite.com/web/
              </span>
              <input
                placeholder="your-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This will be your unique page URL. Only letters, numbers, and
              hyphens.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Page Title *
            </label>
            <input
              placeholder="Enter your page title (appears in browser tab)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800 text-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Page Content
            </label>
            <div
              contentEditable
              className="w-full border border-gray-300 rounded-lg px-4 py-4 min-h-[400px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800 bg-white prose max-w-none"
              onInput={(e) => setContent(e.currentTarget.innerHTML ?? "")}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Write your content here. Basic formatting is supported.
            </p>
          </div>

          <button
            onClick={handlePublish}
            disabled={loading}
            className={`w-full py-4 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Publishing...
              </div>
            ) : (
              "Publish Page"
            )}
          </button>

          {username && title && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                Your page will be available at:{" "}
                <span className="font-mono text-blue-900">
                  {typeof window !== "undefined" ? window.location.origin : ""}
                  /web/{username}
                </span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
