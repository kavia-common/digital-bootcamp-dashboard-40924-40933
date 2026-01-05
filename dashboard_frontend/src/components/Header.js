import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { FiLogOut, FiUsers, FiLayout, FiUserCheck } from "react-icons/fi";

function RolePill({ active, to, icon, label }) {
  return (
    <Link className={`role-pill ${active ? "active" : ""}`} to={to} aria-label={`Switch to ${label}`}>
      <span className="role-pill-icon" aria-hidden="true">{icon}</span>
      <span className="role-pill-text">{label}</span>
    </Link>
  );
}

// PUBLIC_INTERFACE
export function Header() {
  /** Top bar with logo/title, role switcher, and logout placeholder. */
  const loc = useLocation();
  const navigate = useNavigate();

  const isHR = loc.pathname.startsWith("/hr") || loc.pathname.startsWith("/participants");
  const isParticipant = loc.pathname.startsWith("/participant");

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-mark" aria-hidden="true">
          <FiLayout />
        </div>
        <div>
          <div className="app-title">Digital Bootcamp</div>
          <div className="app-subtitle">Dashboard</div>
        </div>
      </div>

      <div className="header-center" aria-label="Role switcher">
        <RolePill active={isParticipant} to="/participant" icon={<FiUserCheck />} label="Participant" />
        <RolePill active={isHR} to="/hr" icon={<FiUsers />} label="HR" />
      </div>

      <div className="header-right">
        <div className="user-chip">
          <div className="user-chip-name">User Name</div>
          <div className="user-chip-role">{isHR ? "HR" : "Participant"}</div>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          aria-label="Logout (placeholder)"
        >
          <FiLogOut style={{ marginRight: 8 }} />
          Logout
        </Button>
      </div>
    </header>
  );
}
