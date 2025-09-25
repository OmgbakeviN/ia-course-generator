import { useState, useEffect } from "react";
import { storage } from "../lib/storage";
import { useNavigate } from "react-router-dom";
import TextType from "../components/TextType";
import TrueFocus from "../components/TrueFocus";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const u = storage.getUser();
    if (u) navigate("/modules");
  }, [navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    storage.setUser({ name, email });
    navigate("/modules");
  };

  return (
    <>
      <div className="min-h-screen grid place-items-center bg-black">
        <TrueFocus
          sentence="AI Course Generator"
          manualMode={false}
          blurAmount={5}
          borderColor="rgb(184, 251, 60)"
          animationDuration={2}
          pauseBetweenAnimations={1}
          className="text-[#b8fb3c] text-2xl font-bold"
        />
        <TextType
          text={[
            "Apprends a coder une IA qui texplique...",
            "Comment coder une IA qui genere des cours",
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-[#b8fb3c] text-2xl font-bold"
        />
        <form onSubmit={onSubmit} className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl border border-[#b8fb3c]/30 p-6 sm:p-8 space-y-6 mx-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Inscription</h1>
            <p className="text-gray-300 text-sm mt-2">Rejoignez notre communauté</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Nom complet</label>
              <input
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 h-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b8fb3c] focus:border-transparent transition-all duration-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Adresse e-mail</label>
              <input
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 h-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b8fb3c] focus:border-transparent transition-all duration-200"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@email.com"
              />
            </div>
          </div>

          <button
            className="w-full h-12 rounded-xl bg-[#b8fb3c] text-black font-semibold hover:bg-[#b8fb3c]/90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-[#b8fb3c]/30"
            type="submit"
          >
            Continuer
          </button>

          <div className="text-center pt-4">
            <p className="text-xs text-gray-400">
              En continuant, vous acceptez nos{' '}
              <a href="#" className="text-[#b8fb3c] hover:underline font-medium">conditions d'utilisation</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
