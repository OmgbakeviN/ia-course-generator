const k = {
    user: "ia.user",
    progress: "ia.progress",
  };
  
  export const storage = {
    getUser() {
      const v = localStorage.getItem(k.user);
      return v ? JSON.parse(v) : null;
    },
    setUser(u) {
      localStorage.setItem(k.user, JSON.stringify(u));
    },
    getProgress() {
      const v = localStorage.getItem(k.progress);
      return v ? JSON.parse(v) : {};
    },
    setProgress(p) {
      localStorage.setItem(k.progress, JSON.stringify(p));
    },
  };
  
  export const ensureUserOr = (navigate) => {
    const u = storage.getUser();
    if (!u) navigate("/signup");
    return u;
  };
  