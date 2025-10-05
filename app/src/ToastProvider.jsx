import { createContext, useContext, useState, useCallback, useEffect } from "react";

const ToastCtx = createContext({ notify: () => {} });

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]); // [{id, msg}]
  const notify = useCallback((msg) => {
    const id = crypto.randomUUID();
    setToasts((t) => [...t, { id, msg }]);
    // auto-hide after 1.5s
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 1500);
  }, []);
  return (
    <ToastCtx.Provider value={{ notify }}>
      {children}
      {/* Toast viewport */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-lg px-3 py-2 shadow-lg bg-black/80 text-white text-sm backdrop-blur transition-opacity"
            role="status"
            aria-live="polite"
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
