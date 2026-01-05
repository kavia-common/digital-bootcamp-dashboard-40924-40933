import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

// PUBLIC_INTERFACE
export function AppShell({ children }) {
  /** Main app layout with header + sidebar and responsive content. */
  return (
    <div className="app-root">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="main" aria-label="Main content">
          {children}
        </main>
      </div>
    </div>
  );
}
