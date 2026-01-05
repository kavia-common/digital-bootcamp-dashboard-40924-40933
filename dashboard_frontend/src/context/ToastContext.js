import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

function createToast(message, intent = "success") {
  return {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    message,
    intent,
  };
}

// PUBLIC_INTERFACE
export function ToastProvider({ children }) {
  /** Provides lightweight toast notifications for UI feedback. */
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback((message, intent = "success") => {
    const toast = createToast(message, intent);
    setToasts((t) => [...t, toast]);
    window.setTimeout(() => remove(toast.id), 3500);
    return toast.id;
  }, [remove]);

  const value = useMemo(() => ({ toasts, push, remove }), [toasts, push, remove]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

// PUBLIC_INTERFACE
export function useToast() {
  /** Hook to push toasts. */
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
