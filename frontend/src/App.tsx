import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { AuthPage } from "./pages/AuthPage";
import { SOSPage } from "./pages/SOSPage";
import { MapPage } from "./pages/MapPage";
import { AICenter } from "./pages/AICenter";
import { Community } from "./pages/Community";
import { Resources } from "./pages/Resources";
import { Volunteers } from "./pages/Volunteers";
import { MissingPersons } from "./pages/MissingPersons";
import { Intelligence } from "./pages/Intelligence";
import { Admin } from "./pages/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/forgot-password" element={<AuthPage mode="forgot-password" />} />
      <Route path="/reset-password" element={<AuthPage mode="reset-password" />} />
      <Route path="/email-verification" element={<AuthPage mode="email-verification" />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sos" element={<SOSPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/ai-center" element={<AICenter />} />
        <Route path="/community" element={<Community />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/missing-persons" element={<MissingPersons />} />
        <Route path="/intelligence" element={<Intelligence />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
