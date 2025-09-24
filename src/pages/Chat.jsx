import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { modules } from "../data/modules";
import { storage, ensureUserOr } from "../lib/storage";
import Topbar from "../components/Topbar";
import Markdown from "../components/Markdown";
import { chatWithGemini, checklistForModule } from "../lib/gemini";

export default function Chat() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(null);

  useEffect(() => { ensureUserOr(navigate); }, [navigate]);

  const m = modules.find(x => x.id === moduleId);
  if (!m) return <div className="p-6">Module introuvable. <Link to="/modules" className="underline">Retour</Link></div>;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = storage.getUser();
        const welcome = { role: "model", text: `Bienvenue ${u?.name || ""}. Objectif: ${m.goal}. Pose ta première question ou demande la checklist.`.trim() };
        if (mounted) setMsgs([welcome]);
        const json = await checklistForModule({ topic: m.title });
        if (mounted) setSteps(json.steps || []);
      } catch {
        if (mounted) setSteps(null);
      }
    })();
    return () => { mounted = false; };
  }, [moduleId]);

  const send = async () => {
    if (!input.trim()) return;
    const u = { role: "user", text: input.trim() };
    setMsgs(prev => [...prev, u]);
    setInput("");
    setLoading(true);
    try {
      const text = await chatWithGemini({
        systemInstruction: m.systemInstruction,
        history: [...msgs, u]
      });
      const bot = { role: "model", text: text || "(réponse vide)" };
      setMsgs(prev => [...prev, bot]);
    } catch (e) {
      setMsgs(prev => [...prev, { role: "model", text: "Erreur lors de l’appel à Gemini." }]);
    } finally {
      setLoading(false);
    }
  };

  const complete = () => {
    const p = storage.getProgress();
    p[moduleId] = true;
    storage.setProgress(p);
    navigate("/modules");
  };

  const toggleStep = (i) => {
    if (!steps) return;
    const next = steps.slice();
    next[i] = { ...next[i], done: !next[i].done };
    setSteps(next);
  };

  return (
<div className="min-h-screen bg-black">
  <Topbar />
  <div className="max-w-5xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-3">
    {/* Zone principale de chat */}
    <div className="md:col-span-2">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold text-white">{m.title}</h1>
        <button 
          onClick={complete} 
          className="h-9 px-4 rounded-lg bg-[#b8fb3c] text-black font-medium hover:bg-[#b8fb3c]/90 transition-colors"
        >
          Module terminé
        </button>
      </div>
      
      {/* Zone des messages */}
      <div className="bg-gray-900 border border-[#b8fb3c]/30 rounded-xl p-4 h-[60vh] overflow-auto space-y-4">
        {msgs.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <div className={`inline-block max-w-[85%] px-4 py-3 rounded-2xl ${
              msg.role === "user" 
                ? "bg-[#b8fb3c] text-black" 
                : "bg-gray-800 border border-[#b8fb3c]/20 text-white"
            }`}>
              {msg.role === "model"
                ? <Markdown text={msg.text} />
                : <span>{msg.text}</span>}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-[#b8fb3c]">
            <div className="w-2 h-2 bg-[#b8fb3c] rounded-full animate-pulse"></div>
            Génération…
          </div>
        )}
      </div>
      
      {/* Zone de saisie */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
        <input 
          className="flex-1 h-12 bg-gray-900 border border-[#b8fb3c]/30 rounded-xl px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b8fb3c] focus:border-transparent transition-all" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Écrire un message..." 
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }} 
        />
        <button 
          onClick={send} 
          className="h-12 px-6 rounded-xl bg-[#b8fb3c] text-black font-medium hover:bg-[#b8fb3c]/90 transition-colors sm:w-auto"
        >
          Envoyer
        </button>
      </div>
    </div>
    
    {/* Sidebar - Checklist */}
    <aside className="md:col-span-1 space-y-4">
      <div className="bg-gray-900 border border-[#b8fb3c]/30 rounded-xl p-4">
        <div className="font-medium mb-3 text-white">Checklist</div>
        {!steps && <div className="text-sm text-gray-400">Aucune checklist</div>}
        {steps && (
          <ul className="space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <input 
                  type="checkbox" 
                  checked={!!s.done} 
                  onChange={() => toggleStep(i)} 
                  className="mt-0.5 w-4 h-4 text-[#b8fb3c] focus:ring-[#b8fb3c] border-gray-600 bg-gray-800 rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${s.done ? 'text-gray-400 line-through' : 'text-white'}`}>
                    {s.title}
                  </div>
                  {s.tip && (
                    <div className="text-xs text-gray-400 mt-1">{s.tip}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  </div>
</div>
  );
}
