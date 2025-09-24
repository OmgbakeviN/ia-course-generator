import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Modules from "./pages/Modules";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/modules" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/modules" element={<Modules />} />
      <Route path="/chat/:moduleId" element={<Chat />} />
      <Route path="*" element={<Navigate to="/modules" replace />} />
    </Routes>
  );
}
