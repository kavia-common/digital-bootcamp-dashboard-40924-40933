import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiGrid, FiUsers, FiFileText } from "react-icons/fi";

// PUBLIC_INTERFACE
export function Sidebar() {
  /** Sidebar navigation. Adapts links based on role inferred from current path. */
  const loc = useLocation();
  const isHR = loc.pathname.startsWith("/hr") || loc.pathname.startsWith("/participants");
  const base = isHR ? "/hr" : "/participant";

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <div className="sidebar-section">
        <div className="sidebar-label">Navigation</div>

        <NavLink
          to={base}
          end
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <FiGrid aria-hidden="true" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={isHR ? "/hr" : "/participant"}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <FiUsers aria-hidden="true" />
          <span>Participants</span>
        </NavLink>

        <NavLink
          to={isHR ? "/hr" : "/participant"}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <FiFileText aria-hidden="true" />
          <span>Submissions</span>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <div className="muted" style={{ fontSize: 12 }}>
          Ocean Professional theme
        </div>
      </div>
    </aside>
  );
}
