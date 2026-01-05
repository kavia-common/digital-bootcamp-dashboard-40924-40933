import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { FiUsers, FiUserCheck } from "react-icons/fi";

// PUBLIC_INTERFACE
export function RoleSelectPage() {
  /** Landing page to choose a role (placeholder auth). */
  const navigate = useNavigate();

  return (
    <div className="center-page">
      <div className="center-wrap">
        <div className="center-title">Welcome to Digital Bootcamp</div>
        <div className="center-subtitle">
          Choose a role to explore the dashboard (auth placeholder).
        </div>

        <div className="center-grid">
          <Card className="role-card">
            <div className="role-card-icon" aria-hidden="true">
              <FiUserCheck />
            </div>
            <div className="role-card-title">Participant</div>
            <div className="role-card-desc">
              Add daily work submissions and review HR feedback.
            </div>
            <Button onClick={() => navigate("/participant")} className="role-card-btn">
              Continue as Participant
            </Button>
          </Card>

          <Card className="role-card">
            <div className="role-card-icon" aria-hidden="true">
              <FiUsers />
            </div>
            <div className="role-card-title">HR</div>
            <div className="role-card-desc">
              Review submissions, mark status, and schedule meetings.
            </div>
            <Button variant="secondary" onClick={() => navigate("/hr")} className="role-card-btn">
              Continue as HR
            </Button>
          </Card>
        </div>

        <div className="muted" style={{ marginTop: 16 }}>
          API base: <code>{process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "(mock)"}</code>
        </div>
      </div>
    </div>
  );
}
