import { ProtectedRoute } from "../components/ProtectedRoute";
import { Dashboard } from "./Dashboard";

export function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
