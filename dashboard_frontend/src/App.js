import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/theme.css";
import { AppStateProvider } from "./context/AppStateContext";
import { ToastProvider } from "./context/ToastContext";
import { ToastViewport } from "./components/ToastViewport";
import { RoleSelectPage } from "./pages/RoleSelectPage";
import { ParticipantDashboardPage } from "./pages/ParticipantDashboardPage";
import { HRDashboardPage } from "./pages/HRDashboardPage";
import { ParticipantDetailsPage } from "./pages/ParticipantDetailsPage";

// PUBLIC_INTERFACE
function App() {
  /** App entry: routing + providers for shared state and toasts. */
  return (
    <ToastProvider>
      <AppStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RoleSelectPage />} />
            <Route path="/participant" element={<ParticipantDashboardPage />} />
            <Route path="/hr" element={<HRDashboardPage />} />
            <Route path="/participants/:id" element={<ParticipantDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastViewport />
        </BrowserRouter>
      </AppStateProvider>
    </ToastProvider>
  );
}

export default App;
