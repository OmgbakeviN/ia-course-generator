import { useEffect, useMemo, useState } from "react";
import { modules } from "../data/modules";
import { storage, ensureUserOr } from "../lib/storage";
import { useNavigate, Link } from "react-router-dom";
import Topbar from "../components/Topbar";

export default function Modules() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});

  useEffect(() => { ensureUserOr(navigate); }, [navigate]);

  useEffect(() => {
    setProgress(storage.getProgress());
  }, []);

  const pct = useMemo(() => {
    const total = modules.length;
    const done = modules.filter(m => progress[m.id]).length;
    return Math.round((done / total) * 100);
  }, [progress]);

  return (
<div className="min-h-screen bg-black">
  <Topbar />
  <div className="max-w-5xl mx-auto px-4 py-6">
    {/* En-tête avec progression */}
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-semibold text-white">Parcours</h1>
        <div className="text-lg font-bold text-[#b8fb3c]">{pct}%</div>
      </div>
      <div className="h-3 bg-gray-800 rounded-full">
        <div 
          className="h-3 bg-gradient-to-r from-[#b8fb3c] to-[#03045e] rounded-full transition-all duration-500" 
          style={{ width: `${pct}%` }} 
        />
      </div>
    </div>

    {/* Liste des modules */}
    <ul className="grid gap-4">
      {modules.map((m) => (
        <li key={m.id} className="bg-gray-900 rounded-xl border border-[#b8fb3c]/20 p-5 hover:border-[#b8fb3c]/40 transition-all duration-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="font-medium text-white text-lg mb-1">{m.title}</div>
              <div className="text-sm text-gray-300">{m.goal}</div>
            </div>
            
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              {progress[m.id] ? (
                <span className="text-xs px-3 py-1.5 rounded-full bg-[#b8fb3c]/20 text-[#b8fb3c] border border-[#b8fb3c]/30">
                  Terminé ✓
                </span>
              ) : (
                <span className="text-xs px-3 py-1.5 rounded-full bg-[#03045e]/50 text-blue-300 border border-[#03045e]/70">
                  À faire
                </span>
              )}
              
              <Link 
                className="px-4 h-10 grid place-items-center rounded-lg bg-[#b8fb3c] text-black font-medium hover:bg-[#b8fb3c]/90 transition-colors text-sm"
                to={`/chat/${m.id}`}
              >
                Ouvrir
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
}
