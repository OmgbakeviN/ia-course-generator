import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="w-full border-b border-[#b8fb3c]/20 bg-black/80 backdrop-blur-lg sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/modules"
          className="font-bold text-xl text-[#b8fb3c] hover:text-[#b8fb3c]/90 transition-colors"
        >
          IA Course Generator
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            to="/modules"
            className="text-white hover:text-[#b8fb3c] transition-colors font-medium"
          >
            Modules
          </Link>
          {/* <Link
            to="/signup"
            className="text-white hover:text-[#b8fb3c] transition-colors font-medium"
          >
            Profil
          </Link> */}
        </nav>
      </div>
    </div>
  );
}
