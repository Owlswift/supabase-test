import { NavbarProps } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({
  user,
  onSignOut,
  title = "MySite",
  showEditorLink = false,
}: NavbarProps) {
  const router = useRouter();

  const handleEditorClick = () => {
    router.push("/editor");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-lg font-semibold text-indigo-600 hover:text-indigo-700 transition"
          >
            {title}
          </Link>

          <div className="flex items-center gap-4">
            {showEditorLink && (
              <button
                onClick={handleEditorClick}
                className="text-indigo-600 hover:text-indigo-700 transition font-medium"
              >
                Editor
              </button>
            )}

            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {user.email}
                </span>
                <button
                  className="text-red-500 hover:text-red-700 transition font-medium"
                  onClick={onSignOut}
                >
                  Sign Out
                </button>
              </>
            ) : (
              !showEditorLink && (
                <Link
                  href="/"
                  className="text-indigo-600 hover:text-indigo-700 transition font-medium"
                >
                  Sign In
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
